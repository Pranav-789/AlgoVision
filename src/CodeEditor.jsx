import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = React.memo(({theme}) => {
  const [code, setCode] = useState("// Start coding here...");
  const [lang, setLang] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [ext, setExt] = useState("js");

  useEffect(() => {
    console.log("language: ", lang);
  }, [lang]);

  console.log("rerendered CodeEditor!");

  const runCode = async () => {
    setOutput("");
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: lang,
          version: "*",
          files: [
            {
              name: `main.${ext}`,
              content: code,
            },
          ],
          stdin: input,
          compile_timeout: 10000,
          run_timeout: 3000,
        }),
      });

      const data = await response.json();

      if (data.run) {
        setOutput(data.run.stdout || data.run.stderr || "Runtime error/ TLE");
      } else {
        setOutput("Error: Invalid response from API.");
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      setOutput("Network/server error!");
    }
  };

  return (
    <div
      className="w-full min-h-screen justify-center flex items-center relative"
      data-theme={theme}
    >
      <h1 className="text-8xl rotate-270 absolute left-[-300px] sm:left-[-305px] font-semibold">
        PLAYGROUND
      </h1>
      <div className="w-[90%] flex flex-col justify-center items-center z-1">
        <div className="w-full">
          <div
            className="w-full h-12 rounded-t-xl flex justify-between items-center p-2 text-white border-2 border-black"
            style={{
              backgroundColor: theme === "dark" ? "white" : "black",
              color: theme === "dark" ? "black" : "white",
            }}
          >
            <div>
              <label htmlFor="selectLanguage">Language: </label>
              <select
                name="selectLanguage"
                className="ml-2 bg-sky-500 p-[2px] outline-none rounded-lg"
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value);
                  if (e.target.value === "java") {
                    setExt("java");
                  } else if (e.target.value === "python") {
                    setExt("py");
                    setCode("#Start writing code here...");
                  } else if (e.target.value === "cpp") {
                    setExt("cpp");
                  } else if (e.target.value === "c") {
                    setExt("c");
                  } else if (e.target.value === "javascript") {
                    setExt("js");
                  }
                }}
              >
                <option value="javascript">JS</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
            </div>
            <button
              className="btn btn-error btn-outline rounded-xl border-2"
              onClick={() => {
                runCode();
              }}
            >
              run code
            </button>
          </div>
          <div className="w-full h-125 border-2 border-black">
            <MonacoEditor
              height="100%"
              language={lang}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={`vs-${theme || "light"}`}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
              }}
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="h-40 w-[50%] border-r-4 border-black rounded-bl-xl text-white bg-black flex flex-col items-center">
            <h1 className="my-1">Input </h1>
            <div className="h-[1px] bg-white w-full"></div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="3"
              className="w-full p-4 bg-gray-600 h-full outline-none text-white rounded resize-y"
            />
          </div>
          <div className="h-40 w-[50%] rounded-br-xl text-white bg-green-800 flex flex-col items-center">
            <h1 className="my-1">Output Console</h1>
            <div className="h-[1px] bg-white w-full"></div>
            <pre className="w-full h-full bg-black p-4 rounded-br-xl text-green-400 overflow-scroll">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CodeEditor;
