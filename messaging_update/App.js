import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Modal,
  Pressable,
  Text, 
  TextInput
} from 'react-native';
import React from 'react';

import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
  createLinkMessage,
} from './utils/MessageUtils';
import ImageGrid from './components/ImageGrid';
import KeyboardState from './components/KeyboardState';
import MeasureLayout from './components/MeasureLayout';
import MessageList from './components/MessageList';
import MessagingContainer, {
  INPUT_METHOD,
} from './components/MessagingContainer';
import Status from './components/Status';
import Toolbar from './components/Toolbar';

export default class App extends React.Component {
  state = {
    messages: [
      createLinkMessage('https://google.com'),
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
    inputMethod: INPUT_METHOD.NONE,
    isModalVisible: false
  };

  

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { fullscreenImageId } = this.state;

        if (fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }

        return false;
      },
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  handlePressToolbarCamera = () => {
    this.setState({
      isInputFocused: false,
      inputMethod: INPUT_METHOD.CUSTOM,
    });
  };

  handlePressToolbarLocation = () => {
    const { messages } = this.state;

    navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude } } = position;

      this.setState({
        messages: [
          createLocationMessage({
            latitude,
            longitude,
          }),
          ...messages,
        ],
      });
    });
  };

  handlePressToolbarLink = () => {
    this.setState({ isModalVisible: true});
  }
  

  handlePressImage = uri => {
    const { messages } = this.state;

    this.setState({
      messages: [createImageMessage(uri), ...messages],
    });
  };

  handleSubmit = text => {
    const { messages } = this.state;

    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  handleChangeFocus = isFocused => {
    this.setState({ isInputFocused: isFocused });
  };

  handleChangeInputMethod = inputMethod => {
    this.setState({ inputMethod });
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(
                    message => message.id !== id,
                  ),
                });
              },
            },
          ],
        );
        break;
      case 'image':
        Alert.alert(
          'Delete image?',
          'Are you sure you want to permanently delete this image?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(
                    message => message.id !== id,
                  ),
                });
              },
            },
          ],
        );
        break;
        case 'location':
        Alert.alert(
          'Delete map?',
          'Are you sure you want to permanently delete this map?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(
                    message => message.id !== id,
                  ),
                });
              },
            },
          ],
        );
        break;
        case 'link':
        Alert.alert(
          'Delete link?',
          'Are you sure you want to permanently delete this link?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(
                    message => message.id !== id,
                  ),
                });
              },
            },
          ],
        );
        break;
      default:
        break;
    }
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  renderToolbar() {
    const { isInputFocused} = this.state;

    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
          onPressLink={this.handlePressToolbarLink}
        />
      </View>
    );
  }

  renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={this.handlePressImage} />
    </View>
  );

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(
      message => message.id === fullscreenImageId,
    );

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  render() {
    const { inputMethod, isModalVisible} = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter URL: </Text>
              <TextInput placeholder="Enter a URL to send..." 
                                  style={styles.textInput}  
                                    /> 
              <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({isModalVisible:false})}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({isModalVisible:false})}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Status />
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessagingContainer
                  {...keyboardInfo}
                  inputMethod={inputMethod}
                  onChangeInputMethod={this.handleChangeInputMethod}
                  renderInputMethodEditor={
                    this.renderInputMethodEditor
                  }
                >
                  {this.renderMessageList()}
                  {this.renderToolbar()}
                </MessagingContainer>
                
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 20
  },
  modalButtons: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly'
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    
  },
  textInput: { 
    width: "90%", 
    borderRadius: 5, 
    paddingVertical: 10, 
    paddingHorizontal: 50, 
    borderColor: "rgba(0, 0, 0, 0.2)", 
    borderWidth: 1, 
    marginBottom: 15, 
}, 
});
