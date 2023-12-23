import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const bgColor = '#fff';
const lineNext = '#ABACAC';
const lineDone = '#4498D6';
const TabsComponent = () => {
  const step = 2;
  const totalSteps = 3;
  return ( 
    <View
      backgroundColor={bgColor}
      style={[styles.navigator, { paddingTop: 15 }]}>
      {[...Array(totalSteps - 1)].map((e, i) => {
        return (
          <React.Fragment key={i}>
            {/* What are the benefits of React fragment?
                    With React Fragment, you can render multiple elements of a component without adding extra div tags*/}
            <View style={[styles.viewSteps, { backgroundColor: '#4498D6' }]}>
              <Text style={{ color: '#fff' }}>{i + 1}</Text>
            </View>
            <View
              style={styles.lineSteps}
              backgroundColor={i + 1 <= step - 1 ? lineDone : lineNext}></View>
          </React.Fragment>
        );
      })}
      <View
        style={[
          styles.viewSteps,
          { backgroundColor: step === 3 ? '#4498D6' : '#ABACAC' },
        ]}>
        <Text style={{ color: '#fff' }}>3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigator: {
    width: '100%',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 150,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  lineSteps: {
    flexGrow: 1,
    height: 2,
  },
  viewSteps: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    borderRadius: 50,
    height: 30,
    width: 30,
  },
});

export default TabsComponent;
