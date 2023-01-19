import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "../../context/appContext";
import Web3 from "web3";
import * as effectsdk from "@effectai/effect-js";

export default function Create() {
  const { cxtAddress, login } = useApp();
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [addBatch, setAddBatch] = useState(false);

  const fetchTasks = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const web3 = new Web3(ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const client = new effectsdk.EffectClient("mainnet");
        const effectAccount = await client.connectAccount(web3);
        login(effectAccount.accountName);
        const content = {
          tasks: { youtube_url: "https://www.youtube.com/embed/xx8QEtZQieI" },
        };
        const submission = await client.force.getBatchId(1, 5);
        const submission1 = await client.force.getBatches(21474836481, 10);

        console.log(submission);
        console.log(submission1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onYouTubeUrlChange = (url) => {
    let text = url.substr(32, 11);
    setYoutubeUrl(text);
  };

  const getMyLastCampaign = async () => {
    const web3 = new Web3(ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const client = new effectsdk.EffectClient("jungle");
    const effectAccount = await client.connectAccount(web3);
    login(effectAccount.accountName);
    const campaign = await client.force.getMyLastCampaign();
    if (campaign.id > 0) {
      setAddBatch(true);
    }
    // await client.force.createBatch(campaign.id, content, repetitions);
  };

  const onCreateWithMetamask = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const web3 = new Web3(ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const client = new effectsdk.EffectClient("mainnet");
        const effectAccount = await client.connectAccount(web3);
        login(effectAccount.accountName);
        console.log(effectAccount);
        const content = {
          tasks: { youtube_url: "https://www.youtube.com/embed/xx8QEtZQieI" },
        };
        // const content = { tasks: { youtube_url: `'` + youtubeUrl + `'` } };
        await client.force.createBatch(53, content, 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // useEffect(() => {
  //   getMyLastCampaign();
  // }, []);

  useEffect(() => {
    if (addBatch) {
      onCreateWithMetamask();
    }
  }, [addBatch]);

  //TODO
  // check for last campaign
  // if there is not a campaign create a new campaign
  // else add batches to campaign

  return (
    <div>
      <div className="navbar bg-base-100 fixed">
        <div className="navbar-start">
          <Link href={"/"} legacyBehavior>
            <a className="btn btn-ghost normal-case text-xl">YouTube Tools</a>
          </Link>
        </div>

        <div className="navbar-end">
          {cxtAddress ? (
            <Link href={"/create"} legacyBehavior>
              <a className="btn">{cxtAddress}</a>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex mt-16 min-h-full min-w-full">
          <ul className="menu bg-base-100 w-56 p-2">
            <li>
              <Link href="/create">Create</Link>
            </li>
            <li>
              <Link href="/view">View</Link>
            </li>
          </ul>
          <div className="w-full rounded-md m-4 flex-col">
            <div className="text-center text-3xl my-2 font-bold">
              View Tasks
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Reward</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                </tbody> */}
              </table>
            </div>
            <div className="w-full flex justify-center">
              <div className="btn-group grid grid-cols-2 w-60">
                <button className="btn btn-outline">Previous</button>
                <button
                  className="btn btn-outline"
                  onClick={() => fetchTasks()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
