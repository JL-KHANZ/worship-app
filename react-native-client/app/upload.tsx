import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, PermissionsAndroid, Platform, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const IMAGEKIT_PUBLIC_KEY = 'public_F/HZwWGdM5bx0nOxlmH3zhnSjQ0=';
const IMAGEKIT_UPLOAD_URL = 'https://ik.imagekit.io/hanaworship';
const IMAGEKIT_FOLDER = '/your-app-folder'; // Optional

export default function Upload() {

  return (
    <View>
      <Text
      style={{margin: 100, textAlign: "center", fontSize: 70}}
      >관리자 페이지</Text>
      <TextInput/>
      <UploadImage />
    </View>
  )
}

function UploadImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access storage',
          message: 'App needs access to your storage to upload images',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied');
        return;
      }
    }

    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('ImagePicker Error', response.errorMessage);
        return;
      }

      const asset = response.assets?.[0];
      if (!asset || !asset.base64) {
        Alert.alert('Error', 'No image selected or failed to load base64.');
        return;
      }

      setImageUri(asset.uri || null);

      const imageForUpload = {
        base64: asset.base64,
        fileName: asset.fileName,
        type: asset.type
      }
      uploadToImageKit(imageForUpload);
    });
  };

  const uploadToImageKit = async (image: {
    fileName?: string;
    base64: string;
    type?: string;
  }) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', `data:${image.type};base64,${image.base64}`);
      formData.append('fileName', image.fileName || 'upload.jpg');
      formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);
      formData.append('folder', IMAGEKIT_FOLDER);

      const response = await axios.post(IMAGEKIT_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Uploaded to ImageKit:', response.data);
      Alert.alert('Upload Successful', response.data.url);
    } catch (error) {
      console.error('❌ Upload failed:', error);
      Alert.alert('Upload Failed', 'Check console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <Button title="Select Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 16 }} />}
      {uploading && <ActivityIndicator style={{ marginTop: 16 }} />}
    </View>
  );
}
