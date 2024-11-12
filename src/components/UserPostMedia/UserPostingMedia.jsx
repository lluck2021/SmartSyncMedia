import React, { useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';

const SocialMediaPostSimulator = () => {
  const [fbAccessToken, setFbAccessToken] = useState('');
  const [fbPageId, setFbPageId] = useState('');
  const [fbMessage, setFbMessage] = useState('');

  const [igAccessToken, setIgAccessToken] = useState('');
  const [igAccountId, setIgAccountId] = useState('');
  const [igImageUrl, setIgImageUrl] = useState('');
  const [igCaption, setIgCaption] = useState('');

  const handleFacebookSubmit = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/v11.0/${fbPageId}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `message=${encodeURIComponent(fbMessage)}&access_token=${fbAccessToken}`,
      });

      const result = await response.json();
      console.log(result);
      Alert.alert('Facebook Response', JSON.stringify(result));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to post to Facebook.');
    }
  };

  const handleInstagramSubmit = async () => {
    try {
      // Step 1: Upload Image
      const uploadResponse = await fetch(`https://graph.facebook.com/v11.0/${igAccountId}/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `image_url=${encodeURIComponent(igImageUrl)}&caption=${encodeURIComponent(igCaption)}&access_token=${igAccessToken}`,
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResult.id) {
        // Step 2: Publish Image
        const creationId = uploadResult.id;
        const publishResponse = await fetch(`https://graph.facebook.com/v11.0/${igAccountId}/media_publish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `creation_id=${creationId}&access_token=${igAccessToken}`,
        });

        const publishResult = await publishResponse.json();
        console.log(publishResult);
        Alert.alert('Instagram Response', JSON.stringify(publishResult));
      } else {
        Alert.alert('Error uploading image', JSON.stringify(uploadResult));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to post to Instagram.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Sync Media</Text>

      <Text style={styles.header}>Post to Facebook</Text>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Facebook Access Token"
        value={fbAccessToken}
        onChangeText={setFbAccessToken}
      />
      <TextInput
        style={styles.input}
        placeholder="Facebook Page ID"
        value={fbPageId}
        onChangeText={setFbPageId}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Your message here"
        value={fbMessage}
        onChangeText={setFbMessage}
        multiline
      />
      <Button title="Post to Facebook" onPress={handleFacebookSubmit} />

      <Text style={styles.header}>Post to Instagram</Text>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' }}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram Access Token"
        value={igAccessToken}
        onChangeText={setIgAccessToken}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram Account ID"
        value={igAccountId}
        onChangeText={setIgAccountId}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={igImageUrl}
        onChangeText={setIgImageUrl}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Your caption here"
        value={igCaption}
        onChangeText={setIgCaption}
        multiline
      />
      <Button title="Post to Instagram" onPress={handleInstagramSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
    verticalAlign: 'middle',
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
  },
  textArea: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
    height: 100,
  },
});

export default SocialMediaPostSimulator;
