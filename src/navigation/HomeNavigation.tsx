import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';
import {userActions} from '@src/store/actions';

import {GalleryEdit} from '@src/pages/gallery/GalleryEdit';
import {MyGallery} from '@src/pages/gallery/MyGallery';
import {LiveTrack} from '@src/pages/track/LiveTrack';
import {MyProfile} from '@src/pages/profile/MyProfile';
import {EditProfile} from '@src/pages/profile/EditProfille';
import {MyTracks} from '@src/pages/track/MyTracks';
import {TrackDetails} from '@src/pages/track/TrackDetails';

const Stack = createNativeStackNavigator();
const BootomTab = createBottomTabNavigator();

function GalleryNavigator() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator initialRouteName="/home/gallery/list">
      <Stack.Screen
        name="/home/gallery/list"
        component={MyGallery}
        options={{
          title: t('gallery'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="/home/gallery/edit"
        component={GalleryEdit}
        options={{
          title: t('edit_gallery'),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function LocationNavigator() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator initialRouteName="/home/track/list">
      <Stack.Screen
        name="/home/track/list"
        component={MyTracks}
        options={{
          title: t('track'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="/home/track/live"
        component={LiveTrack}
        options={{
          title: t('live_track'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="/home/track/details"
        component={TrackDetails}
        options={{
          title: t('track_details'),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator initialRouteName="/home/profile/mine">
      <Stack.Screen
        name="/home/profile/mine"
        component={MyProfile}
        options={{
          title: t('profile'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="/home/profile/mine/edit"
        component={EditProfile}
        options={{
          title: t('edit_profile'),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

const renderGalleryTabIcon = ({color, size}: {color: string; size: number}) => {
  return <FontAwesome name="photo" color={color} size={size} />;
};

const renderTrackTabIcon = ({color, size}: {color: string; size: number}) => {
  return <Entypo name="location" color={color} size={size} />;
};

const renderProfileTabIcon = ({color, size}: {color: string; size: number}) => {
  return <AntDesign name="profile" color={color} size={size} />;
};

function HomeNavigation() {
  const {t} = useTranslation();
  return (
    <BootomTab.Navigator initialRouteName="/home/gallery">
      <BootomTab.Screen
        name="/home/gallery"
        component={GalleryNavigator}
        options={{
          title: t('gallery'),
          tabBarIcon: renderGalleryTabIcon,
          headerShown: false,
        }}
      />
      <BootomTab.Screen
        name="/home/track"
        component={LocationNavigator}
        options={{
          title: t('track'),
          tabBarIcon: renderTrackTabIcon,
          headerShown: false,
        }}
      />
      <BootomTab.Screen
        name="/home/profile"
        component={ProfileNavigator}
        options={{
          title: t('profile'),
          tabBarIcon: renderProfileTabIcon,
          headerShown: false,
        }}
      />
    </BootomTab.Navigator>
  );
}

function mapState(state: any) {
  const {user, loggingIn} = state.auth;

  return {user, loggingIn};
}

const actionCreators = {
  checkAuth: userActions.checkAuth,
};

const connected = connect(mapState, actionCreators)(HomeNavigation);

export {connected as HomeNavigation};
