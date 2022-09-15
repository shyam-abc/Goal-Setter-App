import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id){
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
    endAddGoalHandler();
  }

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button title='Add New Goal' 
                color='#a065ec' 
                onPress={startAddGoalHandler}
        />
        <GoalInput visible={modalIsVisible} 
                    onAddGoal={addGoalHandler} 
                    onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList data={courseGoals}
              keyExtractor={(item,index)=>{
                return item.id;
              }}
              renderItem={(itemData) => {
              return <GoalItem text={itemData.item.text} 
                                id={itemData.item.id}
                                onDeleteItem={deleteGoalHandler}/>;
            }}
          />     
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16, 
  },
  goalsContainer: {
    flex: 5,
  },
});