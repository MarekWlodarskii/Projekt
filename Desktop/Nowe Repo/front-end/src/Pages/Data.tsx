import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { motion } from 'framer-motion';
import './DataStyles.css';
import Test from '../Components/Test';

interface IExerciseData{
    exercise: string;
    rm: string;
}

function Data(){


    const [name, setName] = useState<string>('');
    const [exerciseData, setExerciseData] = useState<IExerciseData[]>([{exercise: '', rm: ''}]);
    const exercise:string = "exercise";
    const rm:string = "rm";

    const [filterByName, setFilterByName] = useState<string>('');
    const testArr: string[] = ["Back Squat", "Front Squat", "Overhead Squat"];
    const [chosenExercise, setChosenExercise] = useState<string>('');
    const [whatId, setWhatId] = useState<number>(0);

    const [ch, setCh] = useState<Boolean>(false);

    const addField = () => {
        setExerciseData([...exerciseData,{exercise:'', rm:''}]);
    }

    const handleExerciseValueChange = (e:string, index:number) => {
       var temp = [...exerciseData];
       debugger;


         temp[index].exercise = e;
             

       
       
        setExerciseData(temp);
    }

    const handleRmValueChange = (e:any, index:number) => {
        var temp = [...exerciseData];
        temp[index].rm = e;
         setExerciseData(temp);
     }

    function removeField(index: number):void{
        var temp = [...exerciseData];
        temp.splice(index+1, 1);
        setExerciseData(temp);
    }



    return (
        <div>
            <Navbar /><br/><br/><br/><br/><br/>
            {ch && (<div style={{position: "fixed", backgroundColor: "rgb(45,45,45,50%)", width: "65%", height: "64%", marginLeft: "18%", border: "1px solid black", color: "white", textAlign: "left"}}>
                <input onChange={(e) => {
                    setFilterByName(e.target.value)
                    }}>
                        
                    </input>
                {
                    testArr.map((value: string) => {
                        if(value.includes(filterByName)) {
                            return (
                                <div onClick={(e) => {
                                    setCh(false); 
                                    handleExerciseValueChange(value, whatId)
                                }}>
                                    {value}
                                </div>
                            )
                        }
                    })}
            </div>)}
            <div style={{width: "100%"}} onClick={() => {setCh(false)}}>
            <div className='RegisterLoginForm'>

                { /* ----------------------------------- USERNAME ----------------------------------- */ }

                    <label htmlFor='name'>
                        <motion.div
                            transition={{type: "tween"}} 
                            key={!!name ? 1 : 0}
                            initial={{y: 30, x: 10}}
                            animate={{y: 0}}
                            className='motionLabel'
                        >
                            {!!name ? "Username" : ""}
                        </motion.div>
                    </label>

                    <div className='Input'>
                        <input
                            className="noDataYet"
                            type='name'
                            placeholder='Username'
                            name='name'
                            onChange={(event) => {setName(event.target.value);}}
                        />
                    </div>

                    

                    {
                        exerciseData.map((data, index) => {
                            return(
                                <div key={index}>
                                    <input 
                                        type="text" 
                                        name={exercise} 
                                        value={data.exercise} 
                                        placeholder='Exercise' 
                                        onChange={(e) => handleExerciseValueChange(e.target.value, index)} 
                                        onFocus={() => {setCh(true); setWhatId(index)}}
                                    />
                                    <input type="text" name="RM" value={data.rm} placeholder='RM' onChange={(e) => handleRmValueChange(e.target.value, index)}/>
                                    <button onClick={() => {removeField(index)}}> - </button>
                                </div>
                            )})}

                
        <button onClick={addField} disabled={!exerciseData[exerciseData.length-1].exercise || !exerciseData[exerciseData.length-1].rm}> + </button>
            </div>
        </div></div>
    )
};

export default Data;