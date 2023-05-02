import React from 'react';
import useFirebase from '@/useHooks/useFirebase';
import Message from '../components/Message';
import useGlobalValues from  '../useHooks/useGlobalValues';
import BookForm from '../components/BookForm';
import Modal from '../components/Modal';
import ModalStyles from '../styles/Modal.module.css';
import HomeStyles from '../styles/Home.module.css';
import ProductStyles from '../styles/Product.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage(){
  const firebase = useFirebase();
  const {booksList,update,error, booksListLoadTime}= useGlobalValues();

  // loads books automatically
  // uses anonymous function
  React.useEffect(function (){
    if(!firebase.currentUser.email)return;
    if(Date.now() -booksListLoadTime < 1000* 60 * 30)return;
    pullBooksFromDb();
      
  });

  const booksListComponents = booksList.map(book=>{
    return <div key={book.id} className={ProductStyles.event}><Link href={`/book/${book.id}`}>
    <div  className={ProductStyles.title}>{book.name}</div></Link>
    <div className={ProductStyles.desc}><span>About : </span>{book.desc}</div>
    <div className={ProductStyles.author}> <span>Author : </span> {book.Author}</div>
    <div>
      <button onClick={deleteBook.bind(deleteBook, book.id,book.user)}>Remove</button>
    </div>
    </div>

  });

  async function deleteBook(bookId,userEmail){
    try{
      if (!firebase.currentUser.email) throw {code:'auth-failed', name:'Firebase Auth'};
      if(firebase.currentUser.email !==userEmail) throw{code:'firestore-unauthorized', name: 'Firebase Firestore'};
      await firebase.removeBook(bookId);
      update({ booksList: booksList.filter(book => book.id !== bookId) , error:' '});
    }catch (e){
      if(e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({error:`${e.name} (${e.code}): You need to login for getting the book list`});
      }
      else  if(e.code === 'firestore-unauthorized' && e.name === 'Firebase Firestore'){
        update({error:`${e.name} (${e.code}): You can only edit books that you added`});
      }
      else{
        update({error:e.toString() });
       
      }
      
    }
  }

  async function pullBooksFromDb(){

    try{
      if (!firebase.currentUser.email) throw {code:'auth-failed', name:'Firebase Auth'};
      const books = await firebase.getBooks();
      update({ booksList:books , error:' ',booksListLoadTime:Date.now()});
    }catch (e){
      if(e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({error:`${e.name} (${e.code}): You need to login for getting the book list`});
      }
      else{
        update({error:e.toString() });
       
      }
      
    }
      
  };

  async function addMyBook(bookDetails){
    try{
      if (!firebase.currentUser.email) throw {code:'auth-failed', name:'Firebase Auth'};
      const newBookDetails = await firebase.addBook({...bookDetails, user:firebase.currentUser.email});
      update({booksList:booksList.concat(newBookDetails)});

    }catch (e){
      if(e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({error:`${e.name} (${e.code}): You need to login for getting the book list`});
      }
    }
  }

  return(
    <>
      <div className={HomeStyles.home}>
        <h1 className={HomeStyles.greeting}> <span className={HomeStyles.name}>Welcome {firebase.currentUser.displayName || ' '} </span></h1>

        <div className={HomeStyles.about}>
            <div className={HomeStyles.aboutImage}>
              <Image
              src="/images/smokeytrees.jpg"
              alt="Bird"
              width={400}
              height={300}
              
              />
            </div>

            <div className={HomeStyles.aboutInfo}>
              <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!

              </div>
            </div>

          
        </div> 

        <div className={HomeStyles.about}>
          <div className={HomeStyles.aboutInfo}>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!</div>
          </div>

          <div className={HomeStyles.aboutImage}>
          <Image
           src="/images/bird.jpg"
           alt="Bird"
           width={400}
           height={300}
          
           />
          </div> 

        </div>

        <div className={ProductStyles.header}>
          <h1>
            Our Picks
          </h1>
        </div>
        <div className={ProductStyles.list}>
          {/* dynamically load data like products listitems from soap factory  */}
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}>Charolttes Webb</div>
            <div className={ProductStyles.desc}><span>About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author : </span> Billy Loe</div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}>A Mockingbird</div>
            <div className={ProductStyles.desc}><span>About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author : </span> Austin Leven </div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}> Harry Potter</div>
            <div className={ProductStyles.desc}><span>About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author : </span> Bill Johnson </div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}>Beloved</div>
            <div className={ProductStyles.desc}><span>About :  </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!</div>
            <div className={ProductStyles.author}> <span>Author : </span>Deon Williams</div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}> StarLight</div>
            <div className={ProductStyles.desc}><span>About :</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author : </span> Kathy Lu </div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}> Big Brother</div>
            <div className={ProductStyles.desc}><span>About :</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author : </span> The Government </div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}>The Great Gatsby</div>
            <div className={ProductStyles.desc}><span>About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author : </span> Juan Velez</div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}> Catcher in the Rye</div>
            <div className={ProductStyles.desc}><span>About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author :  </span>Mya Edwards</div>
          </div>
          <div className={ProductStyles.event}>
            <div  className={ProductStyles.title}> Lovely</div>
            <div className={ProductStyles.desc}><span>About : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! </div>
            <div className={ProductStyles.author}> <span>Author :  </span>Alisia Lee</div>
          </div>
        </div>

        <div className={ProductStyles.header}>
            <h1>Your Books</h1>
        </div>
        <div className={ProductStyles.list}>
            {booksListComponents}
            
          
        </div>

        

        { firebase.currentUser.email ?(
          <>
          <div className={HomeStyles.buttonHolder}>
            <button onClick={pullBooksFromDb} className={HomeStyles.btn}>Refresh Books</button>
            <button onClick={addMyBook} className={HomeStyles.btn}>Add Book</button>
          </div>
          <Modal trigger={<button className={HomeStyles.btn}>Add Book</button>}>
            <BookForm addMyBook={addMyBook} />
          
          </Modal>
          
            
          </>
        ) :(
          <></>
        )}
        
        {error ? (
          <>
            <Message type='error'>{error}</Message>
          </>): (
          <>     
          </>
        )}
      </div>
    </>
  )
}