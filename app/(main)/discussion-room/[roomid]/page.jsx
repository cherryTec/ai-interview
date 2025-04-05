"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api';
import { CoachingExpert } from '@/services/Option'
import { UserButton } from '@stackframe/stack'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React,{useState,useRef,useEffect} from 'react'



import RecordRTC from 'recordrtc';






function DiscussionRoom() {
  const { roomid } = useParams();

  const DiscussionRoomData=useQuery(api.DiscussionRoom.GetDiscussionRoom,{id:roomid});
  console.log(DiscussionRoomData) 

  const [expert, setExpert] = useState();
  const [enableMic, setEnableMic] = useState(false);
  const recorder = useRef(null);
  




  useEffect(() => {
    if(DiscussionRoomData) {
      const Expert = CoachingExpert.find(item => item.name == DiscussionRoomData.expertName)
      console.log('Expert',Expert)
      setExpert(Expert)
    }

  },[DiscussionRoomData])

const connectToServer= () => {
  setEnableMic(true);
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            recorder.current = new RecordRTC(stream, {
                type: 'audio',
                mimeType: 'audio/webm;codecs=pcm',
                recorderType: RecordRTC.StereoAudioRecorder,
                timeSlice: 250,
                desiredSampleRate: 16000,
                numberOfAudioChannels: 1,
                bufferSize: 4096,
                audioBitsPerSecond: 128000,
                ondataavailable: async (blob) => {
                    //if (!realtimeTranscriber.current) return;
                    
                    // Reset the silence detection timer on audio input
                    clearTimeout(silenceTimeout);
                    const buffer = await blob.arrayBuffer();
                    
                    // Restart the silence detection timer
                    silenceTimeout = setTimeout(() => {
                        console.log('User stopped talking');
                        // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
                    }, 2000);
                }
            });
            recorder.current.startRecording();
        })
        .catch((err) => {
            console.error('Error accessing microphone:', err);
        });
   }
};

const disconnect = (e) => {
  e.preventDefault();
  
  recorder.current.pauseRecording(); 
  recorder.current = null;
  setEnableMic(false);
        
};
 

   
  return (
    <div className='-mt-12'>
      <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
      <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <div className='lg:col-span-2'>
               <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
            
                {/* <Image src={expert?.avatar || null} alt='Avatar' width={200} height={200} className='h-[80px] w-[80px] rounded-full object-cover' /> */}
                {expert?.avatar && (
                    <Image 
                      src={expert.avatar} 
                      alt='Avatar' 
                      width={200} 
                      height={200} 
                      className='h-[80px] w-[80px] rounded-full object-cover animate-pulse'
                    />
                    
                    )}
                    <h2 className='text-gray-500'>{expert?.name}</h2>  
                     <div className='p-5 bg-gray-200 px-10 round-lg absolute bottom-10 right-10'>
                      <UserButton />
                      </div> 
                    </div>
                    <div className='mt-5 flex items-center justify-center'>
                       {!enableMic? <Button  onClick={connectToServer}>Connect</Button>
                        : 
                        <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
                       }
                    </div> 
                  </div>

                  <div>
                     <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
                        
                        <h2>Chat Section</h2>
                     </div> 
                     <h2 className='mt-4 text-gray-400 text-sm'>At the end of conversation, we will automatically generate feedback/notes for you</h2>   
                  </div>
                  
                 </div>
               
                 
            
           
            
            
    </div>
  )
}

export default DiscussionRoom