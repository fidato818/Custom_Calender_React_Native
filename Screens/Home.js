import { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useSetState } from 'ahooks';
import TabsComponent from '../components/TabCompoent';
import { format } from 'date-fns';
import { Ionicons, SimpleLineIcons } from 'react-native-vector-icons';
import {
  months,
  yearsArr,
  weekDays,
  lastDaysOfMonth,
  timeLocal,
  amPmLocal,
} from '../utils/data';
// You can import supported modules from npm
import { Card, RadioButton } from 'react-native-paper';

const Home = () => {
  const [state, setState] = useSetState({
    activeDate: new Date(),
    modalVisible: false,
    selectedMonth: months[new Date().getMonth()].monthName,
    selectedYear: new Date().getFullYear(),

    clickedMonth: false,
    clickedDropDown: false,
    fromMonth: false,
    clickedYear: false,
    currentStep: 1,
    valueRadio: '',
    dropDownText: 'Select your frequency',
    arrRadio: [
      {
        itemName: 'Once Off',
      },
      {
        itemName: 'Daily',
      },
      {
        itemName: 'Weekly',
      },
      {
        itemName: 'For a specific time period',
      },
    ],
  });

  const _onPress = (item) => {
    const { activeDate } = state;
    console.log('item', item);
    setState({
      activeDate: new Date(activeDate.setDate(item)),
      selectedDate: item,
    });
  };

  const changeMonth = (n) => {
    setState({
      clickedMonth: false,
      monthCode: n.monthCode,
      selectedMonth: n.monthName,
      activeDate: new Date(activeDate.setMonth(n.monthCode)),
    });
  };
  const changeYear = (n) => {
    setState({
      clickedYear: false,
      selectedYear: n,
      activeDate: new Date(activeDate.setFullYear(n)),
    });
  };

  const generateMatrix = () => {
    const { activeDate } = state;
    var matrix = [];
    // Create header
    matrix[0] = weekDays;
    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = lastDaysOfMonth[month];
    if (month == 1) {
      // February
      // The modulo operator in JavaScript, also known as the remainder operator, is used to find the remainder after dividing one number by another. The modulo operator in JavaScript is represented by the percent sign ( % ). For example, 10 modulo 3 will be 1 (I'll explain how this works after the code sample below
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    var counter = 1;
    for (row = 1; row < 6; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };

  var matrix = generateMatrix();
  const {
    modalVisible,
    selectedMonth,
    clickedMonth,
    activeDate,
    clickedYear,
    selectedYear,
    selectedDate,
    monthCode,
    clickedDropDown,
  } = state;
  const getMonthFilter = months.filter(
    (e, i) => e.monthCode === activeDate.getMonth()
  );
  return (
    <SafeAreaView style={styles.container}>
      <TabsComponent />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
          marginVertical: 10,
          paddingHorizontal: 50,
        }}>
        When do you want your call to be forwarded
      </Text>
      <Text
        style={{
          fontSize: 13,
          // fontWeight: 500,
          textAlign: 'center',
          // marginVertical: 5,
          paddingHorizontal: 10,
          color: '#546E7A',
        }}>
        If you want your call to be forwarded then you must have to schedule the
        time to start forwarding your call as your requirment.
      </Text>
      {/*  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          onPress={() => {
            setState({ modalVisible: true });
          }}
          style={{
            marginVertical: 20,
            // marginHorizontal: 100,
            backgroundColor: '#546E7A',
            paddingHorizontal: 120,
            paddingVertical: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{ 
              fontWeight: '600',
              color: '#fff',
            }}>
            Show Modal
          </Text>
        </Pressable>
      </View>*/}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 50,
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 20,
            borderColor: '#e8e3da',
          }}>
          <View>
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('../assets/calender-img.png')}
            />
          </View>
          <View>
            <Pressable
              onPress={() => {
                setState({ clickedDropDown: !state.clickedDropDown });
              }}
              style={{
                // marginVertical: 20,
                // marginHorizontal: 100,
                backgroundColor: '#fff',
                paddingHorizontal: 50,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: '#000',
                  paddingHorizontal:
                    state.valueRadio.length === 26 ||
                    state.dropDownText.length === 21
                      ? 10
                      : 50,
                }}>
                {state.valueRadio ? state.valueRadio : state.dropDownText}
              </Text>
            </Pressable>
          </View>
          <View>
            {clickedDropDown ? (
              <SimpleLineIcons
                name="arrow-up"
                size={15}
                color="#4498D6"
                // color="#900"
              />
            ) : (
              <SimpleLineIcons
                name="arrow-down"
                size={15}
                color="#4498D6"
                // color="#900"
              />
            )}
          </View>
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {clickedDropDown && (
          <View
            style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10 }}
            elevation={5}>
            <RadioButton.Group
              onValueChange={(newValue) =>
                setState({ valueRadio: newValue, clickedDropDown: false })
              }
              value={state.value}>
              {state.arrRadio.map((e, i) => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                      value={e.itemName}
                      color="#4498D6"
                      uncheckedColor="#4498D6"
                    />
                    <Text>{e.itemName}</Text>
                  </View>
                );
              })}
            </RadioButton.Group>
          </View>
        )}
      </View>
      {/*state.valueRadio === 'Once Off' && ( )*/}  
        <View>
          <Pressable
            onPress={() => {
              setState({ clickedDropDown: !state.clickedDropDown });
            }}
            style={{
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                alignSelf: 'flex-end',
                paddingRight: 80,
                marginVertical: 10,
              }}>
              <Text>Reset</Text>
            </View>
          </Pressable>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingHorizontal: 50,
              }}>
              <View>
                <Text>From</Text>
              </View>
              <View style={styles.touchableStyleTime}>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Pressable
                      onPress={() => {
                        setState({ fromMonth: !state.fromMonth });
                      }}
                      // disabled={clickedMonth === true ? true : false}
                    >
                      <Text
                        style={{
                          fontWeight: '600',
                          color: clickedYear === true ? '#4498D6' : '#000',
                        }}>
                        {selectedYear == ''
                          ? 'Select Year'
                          : new Date().getHours()}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {state.fromMonth ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    )}
                  </View>
                </View>

                {state.fromMonth ? (
                  <View style={styles.clickStyleTime}>
                    <FlatList
                      data={timeLocal}
                      keyExtractor={(item) => item}
                      scrollEnabled={true}
                      nestedScrollEnabled={true}
                      contentContainerStyle={{ flexGrow: 1 }}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.touchableOnClick}
                            onPress={() => changeYear(item)}>
                            <Text
                              style={{
                                fontWeight: '600',
                                // paddingHorizontal: 10,
                                color: item === selectedYear ? '#fff' : '#000',
                                backgroundColor:
                                  item === selectedYear ? '#4498D6' : '#fff',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={styles.touchableStyleTime}>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Pressable
                      onPress={() => {
                        setState({ clickedYear: !state.clickedYear });
                      }}
                      disabled={clickedMonth === true ? true : false}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: clickedYear === true ? '#4498D6' : '#000',
                        }}>
                        {selectedYear == ''
                          ? 'Select Year'
                          : new Date().getHours() >= 12
                          ? 'AM'
                          : 'PM'}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {clickedYear ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    )}
                  </View>
                </View>

                {clickedYear ? (
                  <View style={styles.clickStyleYear}>
                    <FlatList
                      data={amPmLocal}
                      keyExtractor={(item) => item}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.touchableOnClick}
                            onPress={() => changeYear(item)}>
                            <Text
                              style={{
                                fontWeight: '600',
                                // paddingHorizontal: 10,
                                color: item === selectedYear ? '#fff' : '#000',
                                backgroundColor:
                                  item === selectedYear ? '#4498D6' : '#fff',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingHorizontal: 50,
                // borderWidth: 1,
                // borderColor: '#000',
                // marginHorizontal: 40,
              }}>
              <View style={{}}>
                <Text style={{ marginRight: 23 }}>To</Text>
              </View>
              <View style={styles.touchableStyleTime}>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Pressable
                      onPress={() => {
                        setState({ clickedYear: !state.clickedYear });
                      }}
                      disabled={clickedMonth === true ? true : false}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: clickedYear === true ? '#4498D6' : '#000',
                        }}>
                        {selectedYear == ''
                          ? 'Select Year'
                          : new Date().getHours()}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {clickedYear ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    )}
                  </View>
                </View>

                {clickedYear ? (
                  <View
                    style={[styles.clickStyleYear, { position: 'relative' }]}>
                    <FlatList
                      data={timeLocal}
                      keyExtractor={(item) => item}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.touchableOnClick}
                            onPress={() => changeYear(item)}>
                            <Text
                              style={{
                                fontWeight: '600',
                                // paddingHorizontal: 10,
                                color: item === selectedYear ? '#fff' : '#000',
                                backgroundColor:
                                  item === selectedYear ? '#4498D6' : '#fff',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={styles.touchableStyleTime}>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Pressable
                      onPress={() => {
                        setState({ clickedYear: !state.clickedYear });
                      }}
                      disabled={clickedMonth === true ? true : false}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: clickedYear === true ? '#4498D6' : '#000',
                        }}>
                        {selectedYear == ''
                          ? 'Select Year'
                          : new Date().getHours() >= 12
                          ? 'AM'
                          : 'PM'}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {clickedYear ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    )}
                  </View>
                </View>

                {clickedYear ? (
                  <View style={styles.clickStyleYear}>
                    <FlatList
                      data={amPmLocal}
                      keyExtractor={(item) => item}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.touchableOnClick}
                            onPress={() => changeYear(item)}>
                            <Text
                              style={{
                                fontWeight: '600',
                                // paddingHorizontal: 10,
                                color: item === selectedYear ? '#fff' : '#000',
                                backgroundColor:
                                  item === selectedYear ? '#4498D6' : '#fff',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
     
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          setState({ modalVisible: false });
        }}
        style={{}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
              <Pressable onPress={() => setState({ modalVisible: false })}>
                <Ionicons
                  name="close-outline"
                  size={30}
                  color="#4498D6"
                  // color="#900"
                />
              </Pressable>
            </View>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginHorizontal: 70,
                // marginHorizontal: 10,
                // position: 'absolute',
                zIndex: 1,
                // overflow: 'scroll',
              }}>
              <View style={styles.touchableStyle}>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Pressable
                      onPress={() => {
                        setState({ clickedMonth: !state.clickedMonth });
                      }}
                      disabled={clickedYear === true ? true : false}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: clickedMonth === true ? '#4498D6' : '#000',
                        }}>
                        {selectedMonth == '' ? 'Select Month' : selectedMonth}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {clickedMonth ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    )}
                  </View>
                </View>

                {clickedMonth ? (
                  <View
                    style={[
                      styles.clickStyleMonth,
                      {
                        color: selectedMonth ? '#fff' : '#000',
                        backgroundColor: '#fff',
                      },
                    ]}>
                    <FlatList
                      data={months}
                      keyExtractor={(item) => item.monthCode}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.touchableOnClick}
                            onPress={() => changeMonth(item)}>
                            <Text
                              style={{
                                fontWeight: '600',
                                // paddingHorizontal: 10,
                                color:
                                  item.monthName === selectedMonth
                                    ? '#fff'
                                    : '#000',
                                backgroundColor:
                                  item.monthName === selectedMonth
                                    ? '#4498D6'
                                    : '#fff',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              {item.monthName}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={styles.touchableStyle}>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Pressable
                      onPress={() => {
                        setState({ clickedYear: !state.clickedYear });
                      }}
                      disabled={clickedMonth === true ? true : false}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: clickedYear === true ? '#4498D6' : '#000',
                        }}>
                        {selectedYear == '' ? 'Select Year' : selectedYear}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {clickedYear ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={15}
                        color="#4498D6"
                        // color="#900"
                      />
                    )}
                  </View>
                </View>

                {clickedYear ? (
                  <View style={styles.clickStyleYear}>
                    <FlatList
                      data={yearsArr}
                      keyExtractor={(item) => item}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.touchableOnClick}
                            onPress={() => changeYear(item)}>
                            <Text
                              style={{
                                fontWeight: '600',
                                // paddingHorizontal: 10,
                                color: item === selectedYear ? '#fff' : '#000',
                                backgroundColor:
                                  item === selectedYear ? '#4498D6' : '#fff',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                // position: 'relative',
                zIndex: 0,
                backgroundColor: '',
                marginTop: 10,
              }}>
              <Text style={styles.mainText}>
                {getMonthFilter[0].monthName} &nbsp;
                {activeDate.getFullYear()}
              </Text>

              {matrix.map((row, rowIndex) => {
                var rowItems = row.map((item, colIndex) => {
                  return (
                    <Text
                      style={{
                        flex: 1,
                        height: 40,
                        textAlign: 'center',

                        color: item == activeDate.getDate() ? '#fff' : '#000',
                        // Highlight current date
                        fontWeight: item == activeDate.getDate() ? 'bold' : '',
                        borderWidth: item == activeDate.getDate() ? 1 : 0,
                        borderColor:
                          item == activeDate.getDate() ? '#4498D6' : '',
                        backgroundColor:
                          item === activeDate.getDate() ? '#4498D6' : '#fff',
                        borderRadius: 50,
                        margin: 10,
                        padding: 8,
                      }}
                      onPress={() => _onPress(item)}>
                      {item != -1 ? item : ''}
                    </Text>
                  );
                });

                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      padding: 30,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {rowItems}
                  </View>
                );
              })}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                  paddingHorizontal: 30,
                }}>
                <View>
                  <Pressable
                    style={{
                      paddingHorizontal: 50,
                      paddingVertical: 10,
                      backgroundColor: '',
                      borderRadius: 5,
                      borderWidth: 0.5,
                      borderColor: '#000',
                    }}
                    onPress={() => setState({ modalVisible: false })}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={{
                      paddingHorizontal: 50,
                      paddingVertical: 10,
                      backgroundColor: '#4498D6',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#4498D6',
                    }}
                    disabled={monthCode !== undefined ? false : true}
                    onPress={() =>
                      Alert.alert(
                        'date.fns',
                        format(
                          new Date(selectedYear, monthCode, selectedDate),
                          'dd/MMMM/yyyy'
                        )
                      )
                    }>
                    <Text style={{ color: '#fff' }}>Set Date</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainText: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  touchableStyle: {
    width: '35%',
    height: 30,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignSelf: 'center',
    // marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginHorizontal: -50,
  },
  touchableStyleTime: {
    width: '20%',
    height: 30,
    borderRadius: 5,
    // borderWidth: 0.5,
    alignSelf: 'center',
    // marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4498D6',

    // paddingHorizontal: 50,
    // marginHorizontal: -50,
  },
  clickStyleMonth: {
    flex: 1,
    elevation: Platform.OS === 'android' ? 50 : 0,
    marginTop: 20,

    // height: 300,

    alignSelf: 'center',
    // width: '100%',
    width: 130,
    backgroundColor: '#fff',
    // borderRadius: 10,
    top: '60%',
    position: 'absolute',
    zIndex: 1000,
    color: '#fff',
    borderRadius: 10,
  },
  clickStyleYear: {
    flex: 1,
    elevation: Platform.OS === 'android' ? 50 : 0,
    marginTop: 20,
    marginLeft: 15,
    // height: 300,

    alignSelf: 'center',
    // width: '100%',
    width: 70,
    backgroundColor: '#fff',
    // borderRadius: 10,
    top: '60%',
    position: 'absolute',
    zIndex: 1000,
    color: '#fff',
    borderRadius: 10,
  },
  clickStyleTime: {
    flex: 1,
    elevation: Platform.OS === 'android' ? 1000 : 0,
    marginTop: 20,
    marginLeft: 15,
    // height: 300,

    alignSelf: 'center',
    // width: '100%',
    width: 70,
    backgroundColor: '#ffffff',
    // borderRadius: 10,
    top: '60%',
    position: 'absolute',
    zIndex: 1000,
    color: '#ffffff',
    borderRadius: 10,
    // height: 120,
  },
  touchableOnClick: {
    // width: '85%',
    width: 150,
    // alignSelf: 'center',
    alignSelf: 'flex-start',
    // marginHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    // borderBottomWidth: 0.5,
    // borderColor: '#8e8e8e',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    // backdropColor: 0.1,
    // alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#fff',
    // borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 5,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
});
export default Home;
