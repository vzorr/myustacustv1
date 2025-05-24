import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import { SVGIcons } from '../../../../../config/constants/svg';

interface AudioRecorderProps {
  onFinish: (audioFile: any) => void;
  onCancel: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onFinish, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const [audioPath, setAudioPath] = useState('');
  
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  useEffect(() => {
    startRecording();
    
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setAudioPath(result);
      setIsRecording(true);
      
      audioRecorderPlayer.addRecordBackListener((e) => {
        const minutes = Math.floor(e.current_position / 60000);
        const seconds = Math.floor((e.current_position % 60000) / 1000);
        setRecordTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      });
    } catch (error) {
      console.error('Failed to start recording:', error);
      onCancel();
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      return result;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      return null;
    }
  };

  const handleSend = async () => {
    const result = await stopRecording();
    if (result) {
      onFinish({
        uri: result,
        type: 'audio/mp4',
        name: `audio-${Date.now()}.m4a`,
        duration: recordTime
      });
    }
  };

  const handleCancel = async () => {
    await stopRecording();
    onCancel();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <SVGIcons.deleteIcon width={20} height={20} />
      </TouchableOpacity>
      
      <View style={styles.recordingInfo}>
        <View style={styles.recordingDot} />
        <Text style={styles.recordingText}>Recording</Text>
        <Text style={styles.recordingTime}>{recordTime}</Text>
      </View>
      
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  cancelButton: {
    padding: 8,
  },
  recordingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ErrorRed,
  },
  recordingText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy,
  },
  recordingTime: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interMedium,
    color: COLORS.Navy,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.Navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AudioRecorder;
