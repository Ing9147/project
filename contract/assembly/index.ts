import {  logging, PersistentMap} from 'near-sdk-as'

const candidate = new PersistentMap<string,i32>("CandidateName");
const candidateEvent = new PersistentMap<string,string[]>("CandidateEvent");
const eventCreator = new PersistentMap<string,string>("EventCreator");
const userRegis = new PersistentMap<string,string[]>("UserRegister");
const topicArray= new PersistentMap<string,string[]>("TopicArray");

// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  

export function getCandidateScore(name:string):i32{
  if(candidate.contains(name))
  return candidate.getSome(name)
  else
  logging.log("found no candidate")
  return 0
}

export function getCandidateList(topic:string):string[]{
  if(candidateEvent.contains(topic))
  return candidateEvent.getSome(topic)
  else
  logging.log("list not found")
  return []
}

export function getEventCretor(topic:string):string{
  if(eventCreator.contains(topic))
  return eventCreator.getSome(topic)
  else
  logging.log("creator not found")
  return ""
}

export function getUserVotedList(topic:string):string[]{
  if(userRegis.contains(topic))
  return userRegis.getSome(topic)
  else
  logging.log("list not found")
  return []
  
}

export function getAlltopicList():string[]{
  return topicArray.getSome("AllArrays")
}

export function getAlltopic():string[]{
  if(topicArray.contains('AllArrays')){
    return topicArray.getSome("AllArrays")
  }else{
    logging.log('no topics found');
    return []
  }
}

export function didVoted(topic:string, user:string):bool{
  if(userRegis.contains(topic)){
    let getArray=userRegis.getSome(topic);
    return getArray.includes(user)
  }else{
    logging.log('topic not found')
    return false
  }
}

//++++++++++++++++++++++++++++++++++++++++++
export function getScore(topic:string):string[]{
  if(topicArray.contains(topic)){
    logging.log(topicArray.getSome(topic));
    if(candidateEvent.contains(topic)){
      return candidateEvent.getSome(topic)
    }
    else
      return []
  }
  logging.log("topic not found")
  return []
}

export function test():void{
  logging.log('test view');
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain

export function addCandidate(event:string, name:string, ):void{
  if(candidate.contains(name)){
    logging.log("This candidate already exist")
  }
  else{
    candidate.set(name,0);
    candidateEvent.set(event,[name]);
  }
}

export function addToTopicArray(topic:string):void{
  logging.log('added to topic array')
  if(topicArray.contains("AllArrays")){
    logging.log('add addition to topic array')
    let tempArray=topicArray.getSome("AllArrays")
    tempArray.push(topic)
    topicArray.set("AllArrays",tempArray);
  }else{
    topicArray.set("AllArrays",[topic])
  }
}

export function addVote(topic:string,name:string):void{
    let tmpScore = candidate.getSome(name)
    tmpScore +=1;
    candidate.set(name,tmpScore);
  }

export function userVoted(topic:string,user:string):void{
  if(userRegis.contains(topic)){
    let tmpArray=userRegis.getSome(topic);
    tmpArray.push(user);
    userRegis.set(topic,tmpArray)
  }else{
    userRegis.set(topic,[user]);
  }
}

export function clearTopicArray():void{
  logging.log('clearing topic array');
  topicArray.delete("AllArrays")
}