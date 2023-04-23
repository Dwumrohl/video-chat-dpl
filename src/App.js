import MainScreen from "./components/MainScreen/MainScreen.component";
import firepadRef from "./server/firebase";
import "./App.css";
import React, { useEffect} from "react";
import {getDatabase, ref, child, onValue, push, onChildAdded, onChildRemoved, onChildChanged, remove, onDisconnect} from "firebase/database";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "./store/actioncreator";
import { connect } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { useLocation, useNavigate} from "react-router-dom";


function App(props) {
  
  const location = useLocation();
  const navigate = useNavigate();
  const room = localStorage.getItem("roomId");
  const urlTemp = location.pathname.split('/');
  const urlRef = urlTemp[urlTemp.length-1];
  if (room != urlRef){
    //window.location.href = '/';
    navigate("/");
  }
  const userTemp = useAuth();
  const userName = userTemp.user.displayName;
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };

  const onBackButtonEvent = (e) =>{
    e.preventDefault();
  }

  useEffect(async () => {
    const stream = await getUserStream();
    stream.getVideoTracks()[0].enabled = false;
    props.setMainStream(stream);


    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        const defaultPreference = {
          audio: true,
          video: false,
          screen: false,
        };
        const userStatusRef = push(participantRef,{
          userName,
          preferences: defaultPreference,
        });
        props.setUser({
          [userStatusRef.key]: { name: userName, ...defaultPreference },
        });
        //userStatusRef.onDisconnect().remove();   
        onDisconnect(userStatusRef).remove();
       } 
    });
  }, []);

  const db = getDatabase();
  const connectedRef = ref(db, ".info/connected");
  const fpdRef = child(firepadRef, urlRef);
  const participantRef = child(fpdRef, "participants");
  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      onChildAdded(participantRef, (snap) => {
        const preferenceUpdateEvent1 = child(participantRef, snap.key);
        const preferenceUpdateEvent = child(preferenceUpdateEvent1, "preferences");
        onChildChanged(preferenceUpdateEvent, (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        // const audio = new Audio(notifyFile);
        // audio.play(); /////////////////////////////////////////////////////////////////////////////////////
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      onChildRemoved(participantRef, (snap) => {
        // const audio = new Audio(unnotifyFile);
        // audio.play();
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);

  return (
    <div className="App">
      <MainScreen />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
