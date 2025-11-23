import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParentDashboard from '../screens/parent/ParentDashboard';
import ParentNotifications from '../screens/parent/ParentNotifications';
import ParentChildren from '../screens/parent/ParentChildren';
import ParentProfile from '../screens/parent/ParentProfile';
import TeacherDashboard from '../screens/teacher/TeacherDashboard';
import TeacherAttendance from '../screens/teacher/TeacherAttendance';
import TeacherActivities from '../screens/teacher/TeacherActivities';
import TeacherProfile from '../screens/teacher/TeacherProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Parent Stack
function ParentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0B3869',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ParentDashboardScreen"
        component={ParentDashboard}
        options={{ title: 'Dashboard' }}
      />
    </Stack.Navigator>
  );
}

// Parent Tabs
function ParentTabs({ user }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#ddd',
        },
        tabBarActiveTintColor: '#0B3869',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={ParentStack}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Children"
        component={ParentChildren}
        options={{
          title: 'Anak',
          tabBarLabel: 'Anak',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ParentNotifications}
        options={{
          title: 'Notifikasi',
          tabBarLabel: 'Notifikasi',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ParentProfile}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

// Teacher Stack
function TeacherStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0B3869',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="TeacherDashboardScreen"
        component={TeacherDashboard}
        options={{ title: 'Dashboard' }}
      />
    </Stack.Navigator>
  );
}

// Teacher Tabs
function TeacherTabs({ user }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#ddd',
        },
        tabBarActiveTintColor: '#0B3869',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={TeacherStack}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={TeacherAttendance}
        options={{
          title: 'Absensi',
          tabBarLabel: 'Absensi',
        }}
      />
      <Tab.Screen
        name="Activities"
        component={TeacherActivities}
        options={{
          title: 'Aktivitas',
          tabBarLabel: 'Aktivitas',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={TeacherProfile}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppStack({ user }) {
  const userRole = user?.role;

  if (userRole === 'teacher') {
    return <TeacherTabs user={user} />;
  }

  return <ParentTabs user={user} />;
}
