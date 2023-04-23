import firepadRef from "./firebase";
import { store } from "../index";
import {child, onChildAdded, push, set, update} from "firebase/database";

  // const urlTemp = window.location.pathname.split('/');
  // const urlRef = urlTemp[urlTemp.length-1];
  // const fpdRef = child(firepadRef, urlRef);
  // const participantRef = child(fpdRef, "participants");
  var participantRef = null;

export const updatePreference = (userId, preference) => {
  const currentParticipantRef1 = child(participantRef, userId);
  const currentParticipantRef = child(currentParticipantRef1, "preferences");
  setTimeout(() => {
    update(currentParticipantRef, preference);
  });
};

export const createOffer = async (peerConnection, receiverId, createdID) => {

  const currentParticipantRef = child(participantRef, receiverId);
  peerConnection.onicecandidate = (event) => {
    event.candidate &&
    push(child(currentParticipantRef, "offerCandidates"), { ...event.candidate.toJSON(), userId: createdID });
      // currentParticipantRef
      //   .child("offerCandidates")
      //   .push({ ...event.candidate.toJSON(), userId: createdID });
  };

  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
    userId: createdID,
  };

  //await currentParticipantRef.child("offers").push().set({ offer });
  await set(push(child(currentParticipantRef, "offers")), {offer});
};

export const initializeListensers = async (userId) => {
   const urlTemp = window.location.hash.split('/');
   const urlRef = urlTemp[urlTemp.length-1];
   const fpdRef = child(firepadRef, urlRef);
   participantRef = child(fpdRef, "participants");
  const currentUserRef = child(participantRef, userId);
  const currenOffers = child(currentUserRef,"offers");
  onChildAdded(currenOffers, async (snapshot) => {
    const data = snapshot.val();
    if (data?.offer) {
      const pc =
        store.getState().participants[data.offer.userId].peerConnection;
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      await createAnswer(data.offer.userId, userId);
    }
  });

    onChildAdded(child(currentUserRef, "offerCandidates"), (snapshot) => {
    const data = snapshot.val();
    if (data.userId) {
      const pc = store.getState().participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  onChildAdded(child(currentUserRef, "answers"),(snapshot) => {
    const data = snapshot.val();
    if (data?.answer) {
      const pc =
        store.getState().participants[data.answer.userId].peerConnection;
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  onChildAdded(child(currentUserRef, "answerCandidates"), (snapshot) => {
    const data = snapshot.val();
    if (data.userId) {
      const pc = store.getState().participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });


};

const createAnswer = async (otherUserId, userId) => {
  const pc = store.getState().participants[otherUserId].peerConnection;
  const participantRef1 = child(participantRef, otherUserId);
  pc.onicecandidate = (event) => {
    event.candidate &&
    push(child(participantRef1, "answerCandidates"), { ...event.candidate.toJSON(), userId: userId });
      // participantRef1
      //   .child("answerCandidates")
      //   .push({ ...event.candidate.toJSON(), userId: userId });
  };

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
    userId: userId,
  };

  //await participantRef1.child("answers").push().set({ answer });
  await set(push(child(participantRef1, "answers")), {answer});
};
