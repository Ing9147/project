import {  logging, PersistentMap} from 'near-sdk-as'

<<<<<<< HEAD
const eventScore = new PersistentMap<string,i32[]>("eventScore");
const candidateEvent = new PersistentMap<string,string[]>("candidateEvent");
=======
const candidate = new PersistentMap<string,i32>("CandidateName");
const candidateEvent = new PersistentMap<string,string[]>("CandidateEvent");
const eventCreator = new PersistentMap<string,string>("EventCreator");
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
const userRegis = new PersistentMap<string,string[]>("UserRegister");
const topicArray= new PersistentMap<string,string[]>("TopicArray");

// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  

<<<<<<< HEAD
export function getAlltopic():string[]{
  if(topicArray.contains('AllArrays')){
    return topicArray.getSome("AllArrays")
  }else{
    logging.log('no topics found');
    return []
  }
}

export function getCandidateList(topic:string):string[]{
  if(topicArray.getSome('AllArrays').includes(topic))
=======
export function getCandidateScore(name:string):i32{
  if(candidate.contains(name))
  return candidate.getSome(name)
  else
  logging.log("found no candidate")
  return 0
}

export function getCandidateList(topic:string):string[]{
  if(candidateEvent.contains(topic))
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
  return candidateEvent.getSome(topic)
  else
  logging.log("list not found")
  return []
}

<<<<<<< HEAD
export function getEventScore(event:string):i32[]{
  if(topicArray.getSome("AllArrays").includes(event)){
    return eventScore.getSome(event)
  }else{
    logging.log("Event not found")
    return []
  }
}

export function getUserVotedList(topic:string):string[]{
  if(userRegis.contains(topic)){
    logging.log("User vote in this topic");
    return userRegis.getSome(topic)
  }
  else{
    logging.log("list not found");
=======
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
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
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

<<<<<<< HEAD
//+++++++++++++++++++++++++++++++++++++++++
//test function
export function test():string{
  return 'test view 2'
=======
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
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain

<<<<<<< HEAD
//test function
export function addNum(a:i32,b:i32):i32{
  let result:i32 = (a+b)
  return result
}

export function addToTopicArray(topic:string):void{
  if(topicArray.contains("AllArrays")){
    if(topicArray.getSome("AllArrays").includes(topic)){
      logging.log('This topic is already exist')
      return ;
    }
    logging.log('add addition to topic array')
    let tempArray=topicArray.getSome("AllArrays")
    tempArray.push(topic)
    logging.log('added to topic array')
    topicArray.set("AllArrays",tempArray);
  }else{
    logging.log('added to topic array')
=======
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
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
    topicArray.set("AllArrays",[topic])
  }
}

<<<<<<< HEAD
export function addCandidate(topic:string, name:string):void{
  if(!topicArray.getSome("AllArrays").includes(topic)){
    logging.log("topic not found")
  }else{
    if(candidateEvent.contains(topic)){
      if(candidateEvent.getSome(topic).includes(name)){
        logging.log("This candidate already exist in this event")
      }else{
        logging.log("Add candidate to event");
        let tmpS:i32[] = eventScore.getSome(topic);
        tmpS.push(0);
        eventScore.set(topic,tmpS);
        let tmpN:string[] = candidateEvent.getSome(topic);
        tmpN.push(name);
        candidateEvent.set(topic,tmpN);
      }
    }
    else{
      logging.log("Add new candidate to new event");
      candidateEvent.set(topic,[name]);
      eventScore.set(topic,[0]);
    }
  }
  
}


export function addVote(topic:string,name:string,user:string):void{
  if(!topicArray.getSome("AllArrays").includes(topic)){
    logging.log("Topic not found");
  }else{
    if(!candidateEvent.getSome(topic).includes(name)){
      logging.log("Candidate not found")
    }else{
      if(userRegis.contains(topic)){
        if(userRegis.getSome(topic).includes(user)){
          logging.log("You already voted")
        }else{
          let nameIndex = candidateEvent.getSome(topic).indexOf(name);
          let scoreArray = eventScore.getSome(topic);
          scoreArray[nameIndex] +=1 ;
          eventScore.set(topic,scoreArray);
          logging.log("Another vote added");
          logging.log(user + " is voting for " + name)
          let tmpArray=userRegis.getSome(topic);
          tmpArray.push(user);
          userRegis.set(topic,tmpArray)
        }
      }else{
        logging.log("Vote added");
        logging.log(user + " is voting for " + name);
        let nameIndex = candidateEvent.getSome(topic).indexOf(name);
        let scoreArray = eventScore.getSome(topic);
        scoreArray[nameIndex] +=1 ;
        eventScore.set(topic,scoreArray);
        userRegis.set(topic,[user]);
      }
      
    }
  }
}

export function eventEnd(topic:string):void{
  if(!topicArray.getSome("AllArrays").includes(topic)){
    logging.log("Event not found")
  }else{
    eventScore.delete(topic);
    candidateEvent.delete(topic);
    userRegis.delete(topic);
    logging.log("Event is ended")
=======
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
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
  }
}

export function clearTopicArray():void{
  logging.log('clearing topic array');
<<<<<<< HEAD
  topicArray.delete("AllArrays");

}
=======
  topicArray.delete("AllArrays")
}
>>>>>>> 23546e3ae897db30e88f3b5f454c9bcd3c28ff35
