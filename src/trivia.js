export class getIds{
    constructor(categories){
        this._categories =categories;
    }
    get categories(){
        return this._categories;
    }
    set categories(value){
        this._categories = value;
    }
    shuffle(array){
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
    }
    populateCategories (){
        const selector = document.querySelector('#select_categories');
        this._categories.map(({id, name})=>{
            const option = document.createElement('option');
            option.setAttribute('value', id);
            option.appendChild(document.createTextNode(name));
            selector.append(option)
        })
    }

}

 export class getQuestions{
     constructor(questions, score, span_score){
        this._questions = questions;
        this._score =score;
        this._span_score =span_score;
     }
     get questions(){
         return this._questions;
     }
     set questions(questions){
         this._questions =questions;
     }
     get score(){
        return this._score;
    }
    set score(score){
        this._score =score
    }
    get span_score(){
        return this._span_score;
    }
    set span_score(span_score){
        this._span_score= span_score;
    }
    shuffle(array){
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
    } 
  
    displayAnswers(answers, list, correct_answer, containerQA ){
        answers.map(answer =>{
            const li = document.createElement('li');
            li.setAttribute('id', answer);
            li.innerHTML=answer;
            li.addEventListener('click', (e)=>{
                
                e.target.id ===correct_answer? this._score+=100: this._score;
                e.target.id ===correct_answer? li.setAttribute('style','background-color: #A3CB38') :li.setAttribute('style','background-color: #EB2F06') ;
                this._span_score.innerHTML=this._score;
                setTimeout(()=>{
                    containerQA.style.display ="none";
                },700)
            },{once:true})
            list.appendChild(li)
        }).join('')
    }
     displayQuestions(){
         this._questions.map(({category, correct_answer, difficulty,incorrect_answers, question})=>{
             const answers = [correct_answer, ...incorrect_answers];
             const questions_field = document.querySelector('.questions_answers');
             const question_div = document.createElement('div');
             const containerQA = document.createElement('div')
             containerQA.setAttribute('class','containerQA' );
             question_div.setAttribute('class','answers')
             const list = document.createElement('ul');
             list.setAttribute('class', 'list_answers');
            this.shuffle(answers);
            this.displayAnswers(answers,list, correct_answer, containerQA)
            const titles_div = document.createElement('div',)
            titles_div.setAttribute('class', 'question_titles')
            const h4_cat = document.createElement('h4')
            h4_cat.innerHTML='Category: '+category;
            const h4_dif = document.createElement('h4')
            h4_dif.innerHTML='Difficulty: '+ difficulty;
            const h5_que = document.createElement('h5')
            h5_que.innerHTML='* '+question
            questions_field.appendChild(containerQA);
            containerQA.appendChild(titles_div)
            containerQA.append(question_div);
            titles_div.appendChild(h4_cat);
            titles_div.appendChild(h4_dif);
            question_div.appendChild(h5_que);
            question_div.appendChild(list);
        })
     }

 }


