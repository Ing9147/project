import {  logging, PersistentMap} from 'near-sdk-as'

const eventScore = new PersistentMap<string,i32[]>("eventScore");
const candidateEvent = new PersistentMap<string,string[]>("candidateEvent");
const userRegis = new PersistentMap<string,string[]>("UserRegister");
const topicArray= new PersistentMap<string,string[]>("TopicArray");

// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  

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
  return candidateEvent.getSome(topic)
  else
  logging.log("list not found")
  return []
}

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

//+++++++++++++++++++++++++++++++++++++++++
//test function
export function test():string{
  return 'test view 2'
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain

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
    topicArray.set("AllArrays",[topic])
  }
}

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
  }
}

export function clearTopicArray():void{
  logging.log('clearing topic array');
  topicArray.delete("AllArrays");

}
