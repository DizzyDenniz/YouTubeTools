import Head from "next/head";
import Image from "next/image";
import * as effectsdk from "@effectai/effect-js";
import Web3 from "web3";
import { useContext, useState } from "react";
import Link from "next/link";
import { useApp } from "../context/appContext";

const campaignToIpfs = {
  title: "TheTestCampaign",
  description: "Testing 12345",
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

export default function Home() {
  const [address, setAddress] = useState();
  const { cxtAddress, login } = useApp();
  const buttonClick = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const web3 = new Web3(ethereum);
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const client = new effectsdk.EffectClient("jungle");
          const effectAccount = await client.connectAccount(web3);
          // login(effectAccount.accountName);
          // console.log(effectAccount);
          // // return web3;
          // const campaign = await client.force.getMyLastCampaign();
          // if (campaign.id > 0) {
          //   setAddBatch(true);
          // }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onCreate = async () => {
    const client = new effectsdk.EffectClient("jungle");
    const account = effectsdk.createAccount("");
    console.log(account);
    const web3 = effectsdk.createWallet(account);
    const effectAccount = await client.connectAccount(web3);
    console.log(effectAccount);
    //const uploadData = getUploadData();
    // console.log(uploadCampaignIpfs);
    //const campaign = await client.force.getMyLastCampaign();
    const makeCampaign = await client.force.makeCampaign(campaignToIpfs, "1");
    console.log(makeCampaign);
  };

  const onCreateWithMetamask = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const web3 = new Web3(ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const client = new effectsdk.EffectClient("jungle");
        const effectAccount = await client.connectAccount(web3);
        login(effectAccount.accountName);
        console.log(effectAccount);
        const makeCampaign = await client.force.makeCampaign(
          campaignToIpfs,
          "1"
        );
        console.log(makeCampaign);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Head>
        <title>YouTube Tools</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Crowdsource your YouTube tasks
            </h1>
            <p className="py-6">
              Perform time consuming YouTube channel tasks such as creating
              chapters, subtitles, thumbnails using
              <span style={{ color: "#5158fa" }}> Effect Task Force</span>.
            </p>
            {!cxtAddress && (
              <button className="btn btn-primary" onClick={() => buttonClick()}>
                Sign in
              </button>
            )}
            {cxtAddress && (
              <button
                className="btn btn-primary"
                onClick={() => onCreateWithMetamask()}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}