import axios from 'axios';
import { getIds, getQuestions } from './trivia'
import './styles/style.scss'
let score =0;
let span_score = document.getElementById('score_number')
span_score.innerHTML=score;

const reloader = document.getElementById('reload');
reloader.addEventListener('click',()=>{
    window.location.reload()
})


const submit = document.getElementById("submit_answers");
submit.addEventListener('click', (e)=>{
    e.preventDefault();
    const difficulty = document.getElementById('select_difficulty').value;
    const category = document.getElementById('select_categories').value;
    const type = document.getElementById('select_type').value;
    fetchQuestions(category,difficulty,type);
})

function fetchQuestions(id, difficulty, type){
    console.log(id, difficulty, type);
    axios.get('https://opentdb.com/api.php?amount=10',{
        params:{
            category: id,
            difficulty,
            type
        }
    }).then(({data})=>{
        const questions =data.results;
        if (questions.length>0){
            const displayTrivia = new getQuestions(questions, score, span_score);
            displayTrivia.displayQuestions();
            submit.style.display="none";
            reloader.style.display="inline-block"
        }else{
            alert("We don't have enoguh questions for that category, could you try again?")
        }

        
    }).catch(err =>console.log(err));
}

function fetchIds(){
    axios.get('https://opentdb.com/api_category.php')
        .then(({data})=>{
            const categories = data.trivia_categories;
                const game = new getIds(categories);
                game.populateCategories()
        })
        .catch(err=>console.log(err));
}

fetchIds()
