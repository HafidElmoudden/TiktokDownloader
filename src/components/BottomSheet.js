import React, { useRef } from 'react';
import DownloadButton from './DownloadButton';
import {Image, View, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = ({fetchedData, refHandler}) => {
  const RBSheetRef = useRef(null);

  if(RBSheetRef)
    refHandler(RBSheetRef);
  console.log("reached??,xd");
  return (
    <RBSheet
      ref={RBSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={500}
      customStyles={{
        wrapper: {},
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopEndRadius: 20,
        },
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FEFEFE',
        }}>
        <Text
          style={{
            marginTop: '10%',
            marginBottom: '6%',
            fontWeight: 'bold',
            fontSize: 18,
            color: 'black',
          }}>
          Video Found
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '90%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}>
          <Image
            source={{
              uri: fetchedData?.itemInfo?.itemStruct?.video?.cover || '',
            }}
            style={{
              width: 140,
              height: 90,
              resizeMode: 'contain',
              borderRadius: 10,
              alignSelf: 'flex-start',
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginLeft: 15,
              width: '40%',
              height: '100%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'black',
                marginTop: 5,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {fetchedData?.itemInfo?.itemStruct?.author?.nickname || ''}
            </Text>
            <Text
              style={{color: 'black', fontSize: 15, marginTop: 5}}
              numberOfLines={2}
              ellipsizeMode="tail">
              {fetchedData?.seoProps?.metaParams?.title || ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '90%',
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 17,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '96%',
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image source={require('../assets/video-download.png')} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 15,
                }}>
                Watermark Video
              </Text>
            </View>
            <DownloadButton />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              width: '96%',
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image source={require('../assets/video-download.png')} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 15,
                }}>
                No Watermark Video
              </Text>
            </View>
            <DownloadButton />
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
