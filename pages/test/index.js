import Link from "next/link";
import { useEffect } from "react";
import { useApp } from "../../context/appContext";
import * as effectsdk from "@effectai/effect-js";

const campaignToIpfs = {
    title: "TheTestCampaign",
    description: "Testing 123",
    instructions: "Test me here",
    template:
      `<div style="text-align:center">
    <div className="content">
        <h2>Make chapters for this video 🎬</h2>
        <iframe height="200" src='` +
      "${video_url}" +
      `'></iframe>
        <div style="display:flex;justify-content:center">
            <div style="flex: 1">Start</div>
            <input style="flex: 1" type="text" id="inputStart"></input>
        </div>
        <div style="display: flex; justify-content:center">
            <div style="flex: 1">End</div>
            <input style="flex: 1 " type="text" id="inputEnd"></input>
        </div>
        <div style="display: flex; justify-content: center">
            <div style="flex: 1">Title</div>
            <input style="flex: 1" type="text" id="inputTitle"></input>
        </div>
        <div style="display:flex; justify-content: center">
            <button onclick="addChapter();">Add</button>
        </div>
        <h4>Chapter List</h4>
        <div style="
          display: flex;
          align-items:center;
          flex-direction:column;" id="chapterList">
        </div>
        <script>
            function addChapter() {
                let titleText = document.getElementById("inputTitle").value;
                let startText = document.getElementById("inputStart").value;
                let endText = document.getElementById("inputEnd").value;
                let newChapter = "<div style='display:flex; align-items:center; flex-direction:colomn'><div style='padding-right: 5px'>" + titleText + ":</div><div>" + startText + " - " + "</div> <div>" + endText + "</div></div>";
                alert(newChapter);
                document.getElementById("chapterList").insertAdjacentHTML('beforeend', newChapter);
            }
            
        </script>
    </div>
</div>`,
    image:
      "https://ipfs.effect.ai/ipfs/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4",
    category: "Video Chapters",
    example_task: {
      video_url: "https://www.youtube.com/embed/xx8QEtZQieI",
    },
    tasks: [{ video_url: "https://www.youtube.com/embed/xx8QEtZQieI" }],
    version: 1,
    reward: 1,
  };

export default function Create() {
  const { cxtAddress, login } = useApp();

  const client = new effectsdk.EffectClient('jungle');

  const onCreate = async () => {
        const makeCampaign = await client.force.makeCampaign(campaignToIpfs, '10')
        console.log(makeCampaign)
      }

  return (
    <div>
      <div className="navbar bg-base-100 fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link href={"/"} legacyBehavior>
            <a className="btn btn-ghost normal-case text-xl">YouTube Tools</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {cxtAddress ? (
            <Link href={"/create"} legacyBehavior>
              <a className="btn">{cxtAddress}</a>
            </Link>
          ) : (
            <a className="btn" onClick={()=> onCreate()}>Create</a>
          )}
        </div>
      </div>
    </div>
  );
}
