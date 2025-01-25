import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="relative overflow-hidden shadow-md rounded-lg">
        <table className="table-fixed w-full text-left">
            <thead className="uppercase bg-gray-600 text-gray-200">
                <tr>
                    <td className="py-2 border text-center p-4" contentEditable="true">Product-ID</td>
                    <td className="py-2 border text-center p-4" contentEditable="true">Description</td>
                    <td className="py-2 border text-center p-4" contentEditable="true">Price</td>
                    <td className="py-2 border text-center p-4" contentEditable="true"></td>
                    <td className="py-2 border text-center p-4" contentEditable="true"></td>
                    <td className="py-2 border text-center p-4" contentEditable="true"></td>
                    <td className="py-2 border text-center p-4" contentEditable="true"></td>
                </tr>
            </thead>
            <tbody className="bg-white text-gray-500">
                <tr>
                    <td className="py-5 border text-center p-4" >YY-853581</td>
                    <td className="py-5 border text-center p-4" >Notebook Basic</td>
                    <td className="py-5 border text-center p-4" >$ 299</td>
                    <td className="py-5 border text-center p-4" >YY-853599</td>
                    <td className="py-5 border text-center p-4" >Notebook Pro</td>
                    <td className="py-5 border text-center p-4" >$ 849</td>
                    <td className="py-5 border text-center p-4" >😊</td>
                </tr>
                {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                        <td className="py-5 border text-center p-4" contentEditable="true"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


}


export default App
