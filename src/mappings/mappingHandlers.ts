import { DelegatorReward } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const newDelegatorReward = new DelegatorReward(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );

 newDelegatorReward.blockHeight = BigInt(event.block.block.header.height);
 newDelegatorReward.txHash = event.tx.hash;
 newDelegatorReward.delegatorAddress = event.msg.msg.decodedMsg.delegatorAddress;
 newDelegatorReward.validatorAddress = event.msg.msg.decodedMsg.validatorAddress;

 for (const attr of event.event.attributes) {
   if (attr.key === "amount"){
     newDelegatorReward.rewardAmount = attr.value;
   }
 }

 await newDelegatorReward.save();
}
