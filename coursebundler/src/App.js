import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import About from './components/about/About'
import AdminCourses from './components/admin/admincourses/AdminCourses'
import Createcourse from './components/admin/createcourse/Createcourse'
import Dashboard from './components/admin/dashboard/Dashboard'
import User from './components/admin/users/User'
import Forgetpassword from './components/Auth/Forgetpassword'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Resetpassword from './components/Auth/Resetpassword'
import Contact from './components/contact/Contact'
import CoursePage from './components/coursepage/CoursePage'
import Courses from './components/courses/Courses'
import Home from './components/home/Home'
import Footer from './components/layout/footer/Footer'
import Header from './components/layout/header/Header'
import NotFound from './components/layout/NotFound'
import Changepassword from './components/profile/Changepassword'
import Profile from './components/profile/Profile'
import Updateprofile from './components/profile/Updateprofile'
import Request from './components/request/Request'
import PaymentFail from './components/subscribe/PaymentFail'
import PaymentSuccess from './components/subscribe/PaymentSuccess'
import Subscribe from './components/subscribe/Subscribe'

import toast,{Toaster}  from "react-hot-toast"
import { getMyProfile } from './redux/actions/userAction'
import {ProtectedRoute } from "protected-route-react"
import Loader from './components/layout/loader/Loader'





const App = () => {







window.addEventListener("contextmenu",(e)=>{
  e.preventDefault()
})






const dispatch=useDispatch()
const {loading,isAuthenticated,user,message,error,}=useSelector((state)=>state.users)

useEffect(()=>{

if(error){
  toast.error(error)
dispatch({type:'clearError'})
}
if(message){
  toast.success(message)
dispatch({type:'clearMessage'})
}

},[dispatch,error,message])


useEffect(()=>{
  
  dispatch(getMyProfile())


  },[dispatch])

 
  
  return (
   <Router>
{
  loading?(<Loader/>):(
    <>
{
  console.log("router" +isAuthenticated)
}
    <Header isAuthenticated={isAuthenticated} user={user}  />



<Routes>

  <Route path='/' element={<Home/>}></Route>
  <Route path='/courses' element={<Courses/>}></Route>
  <Route path='/profile' element={<ProtectedRoute 
  isAuthenticated={isAuthenticated} >
    <Profile user={user} />
    </ProtectedRoute>}></Route>
  <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
    <Changepassword/>
  </ProtectedRoute>}></Route>
  <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
  <Updateprofile/>
  </ProtectedRoute>}></Route>
  <Route path='/course/:id' element={<ProtectedRoute
    isAuthenticated={isAuthenticated}      ><CoursePage user={user}  /></ProtectedRoute>}></Route>
  <Route path='/login' element={<ProtectedRoute
   isAuthenticated={!isAuthenticated}  redirect="/profile" ><Login/></ProtectedRoute>}></Route>
  <Route path='/contact' element={<Contact/>}></Route>
  <Route path='/about' element={<About/>}></Route>
  <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
  <Subscribe user={user}  />
  </ProtectedRoute>}></Route>
  <Route path='*' element={<NotFound/>}></Route>
  <Route path='/paymentsuccess' element={<PaymentSuccess/>}></Route>
  <Route path='/paymentfail' element={<PaymentFail/>}></Route>
  <Route path='/request' element={<Request/>}></Route>
  <Route path='/register' element={<ProtectedRoute 
   isAuthenticated={!isAuthenticated}  redirect="/profile"       ><Register/></ProtectedRoute>}></Route>
  <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
  <Resetpassword/>
  </ProtectedRoute>}></Route>
  <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"  >
  <Forgetpassword/>
  </ProtectedRoute>
 }></Route> 




  <Route path='/admin/dashboard' element={<ProtectedRoute adminRoute={true}    isAuthenticated={isAuthenticated} isAdmin={user && user.role==="admin"}  >
    <Dashboard/>
  </ProtectedRoute>}></Route>
  <Route path='/admin/createcourse' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==="admin"}>
  <Createcourse/>
  </ProtectedRoute>}></Route>
  <Route path='/admin/courses' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==="admin"} >
  <AdminCourses/>
  </ProtectedRoute>}></Route>
  <Route path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==="admin"}>
  <User/>
  </ProtectedRoute>}></Route>
</Routes>

<Footer/>
<Toaster/>
    
    
    </>
  )
}
   </Router>
  )
}

export default App