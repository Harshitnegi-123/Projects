import React from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
    const ref = useRef()
    const PasswordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [PasswordArray, setPasswordArray] = useState([])

    //     ref → eye icon <img> ka reference (src badalne ke liye).

    // PasswordRef → password <input> ka ref (type show/hide ke liye).

    // form → user input values ko store karta hai.

    // PasswordArray → fetched ya saved passwords ka list.


    const getPasswords = async () => {
        try {
            const res = await fetch("http://localhost:3000/");
            const password = await res.json();
            console.log(password);
            setPasswordArray(password);
        } catch (error) {
            console.error("Error fetching passwords:", error);
        }
    }

    // Ye "password" localStorage me ek key (naam) hai. Tumhara browser ek chhoti si dictionary ki tarah behave karta hai jisme key-value pairs store hote hain.

    useEffect(() => {
        getPasswords()
    }, [])

    // ref.current.src check karta hai image ka path aur accordingly password ki visibility toggle karta hai.

    const ShowPass = () => {
        PasswordRef.current.type = "password"
        if (ref.current.src.includes("/eye.svg")) {
            ref.current.src = "/eyecross.svg"
            PasswordRef.current.type = "password"
        }
        else {
            ref.current.src = "/eye.svg"
            PasswordRef.current.type = "text"
        }
    }


    const SavePass = async () => {
        //         Agar form.id already exist karta hai (edit case), toh wahi id use karo.

        // Agar form.id nahi hai (add new case), toh uuidv4() se ek unique id generate karo.

        let newId = form.id ? form.id : uuidv4();

        // React State update
        setPasswordArray([...PasswordArray, { ...form, id: newId }]);

        // Pehle purana password delete karo (agar edit ka case ho)
        if (form.id) {
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id: form.id })  // delete old one
            });
        }

        // Insert new (edited or new) value
        await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...form, id: newId })
        });

        setform({ site: "", username: "", password: "" });
    };


    // filter sabko check krega or new array me bhejega fhir item ek individual password object hai jo password array mein hota hai. or fhir arrow function har item ko check krega ki id match kr rhi h yaa nhi agar id match nhi kregi toh bhai wo id store ho jayega new array me filter ki help se or agar id match nhi hui toh bhai filter usko add hi ni krega toh wo delete hi ho jayega na.

    const DeletePassword = async (id) => {
        let c = confirm("Do You Want To Delete This Password")
        if (c) {
            setPasswordArray(PasswordArray.filter(item => item.id !== id))
            // localStorage.setItem("password", JSON.stringify(PasswordArray.filter(items => items.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) })
        }
    }

    // PasswordArray	Ye tumhara array hai jisme sare passwords stored hain
    // .filter(...)	Ye array me se kuch specific cheezen nikalta hai
    // i => i.id === id	Har item (i) ka id check karta hai — agar match ho gaya user ke diye id se, to usko nikal lo

    const EditPassword = (id) => {
        // Yahaan i ek temporary variable hai jo filter function ke andar har element ko represent karta hai.
        setform({ ...PasswordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(PasswordArray.filter(item => item.id !== id))
    }
    // Ye object ka spread operator use karke uski sari properties ko le raha hai (jaise: website, username, password, etc.).

    // Phir explicitly id: id se ensure kar raha hai ki id bhi include ho (safe side pe).

    const HandleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const CopyText = (text) => {
        toast('Text Copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className='flex flex-col flex-grow px-4 sm:px-10'>
                {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
                <div className="absolute top-0 left-0 z-[-2] min-h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                <div className=" mycontainer text-black">
                    <h1 className='text-3xl sm:text-4xl font-bold text-center flex flex-nowrap justify-center items-center gap-2'>
                        <span className='text-green-800 font-bold text-3xl'>&lt;</span>
                        <span className='text-black text-4xl'>Yo</span>
                        <span className='text-green-800 font-bold text-3xl'>Pass/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>
                    <div className='text-white flex flex-col p-4 gap-4  sm:gap-8 items-'>
                        <input value={form.site} onChange={HandleChange} placeholder='Enter Website URL' className='rounded-full bg-white border border-green-500 w-full p-4 py-1 text-black' type="text" id='site' name='site' />
                        <div className="flex flex-col sm:flex-row sm:gap-8 w-full gap-4 justify-between">
                            <input value={form.username} onChange={HandleChange} placeholder='Enter UserName' className='rounded-full bg-white border border-green-500 w-full p-4 py-1 text-black' type="text" id='username' name='username' />
                            <div className="relative">
                                <input ref={PasswordRef} value={form.password} onChange={HandleChange} placeholder='Enter Password' className='rounded-full bg-white border border-green-500 w-full p-4 py-1 text-black' type="password" id='password' name='password' /><span className='absolute text-black right-2 top-1.5 cursor-pointer' onClick={ShowPass}>
                                    <img ref={ref} src="/eyecross.svg" alt="" />
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-center w-full'>
                            <button onClick={SavePass} className=' w-full max-w-xs sm:max-w-sm md:max-w-md text-white border-2 border-green-900 rounded-md p-1.5 py-2  bg-green-700 hover:bg-green-600 font-bold text-sm px-2 items-center justify-center flex gap-3 '><lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                            >
                            </lord-icon>Add Password</button>
                        </div>
                    </div>

                    <div className="passwords justify-items-center px-2 w-full overflow-x-hidden mb-10  ">
                        <h2 className='font-bold text-lg py-4 text-center text-black'>Your Passwords</h2>
                        <div className='mx-auto w-full max-w-5xl overflow-x-auto max-h-90'>
                            {PasswordArray.length === 0 && <div>No Passwords</div>}
                            {PasswordArray.length != 0 &&
                                <table className=" w-full min-w-[600px] text-sm text-center bg-green-100 rounded-md">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className='py-2'>Site</th>
                                            <th className='py-2'>UserName</th>
                                            <th className='py-2'>Password</th>
                                            <th className='py-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PasswordArray.map((items, index) => {
                                            return <tr key={index}>
                                                <td className='text-center w-32 py-2 border border-white '>
                                                    <div className=' copybutton flex justify-center items-center gap-2 overflow-x-auto' onClick={() => { CopyText(items.site) }}>
                                                        <a href={items.site} target='_blank'>{items.site}</a>
                                                        <img className='cursor-pointer' src="/copy.png" alt="copy button" />
                                                    </div>
                                                </td>
                                                <td className='text-center w-32 py-2 border border-white '>
                                                    <div className=' copybutton flex whitespace-nowrap items-center justify-center gap-2 overflow-x-auto ' onClick={() => { CopyText(items.username) }} >
                                                        <span>{items.username}</span>
                                                        <img className='cursor-pointer' src="/copy.png" alt="copy button" /></div>
                                                </td>
                                                <td className='text-center w-32 py-2 border border-white '>
                                                    <div className=' copybutton flex items-center justify-center gap-2 overflow-x-auto' onClick={() => { CopyText(items.password) }}>
                                                        <span>{items.password}</span>
                                                        <img className='cursor-pointer' src="/copy.png" alt="copy button" /></div>
                                                </td>
                                                <td className='text-center w-32 py-2 border border-white '>
                                                    <span className='flex justify-center items-center gap-3 '>

                                                        <img onClick={() => { EditPassword(items.id) }} className='w-4 cursor-pointer' src="/edit1.png" alt="" />
                                                        <img onClick={() => { DeletePassword(items.id) }} className='w-4 cursor-pointer' src="/trash.png" alt="" />
                                                    </span>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager


// ye hum value me form.site wagera jo likhe h uska mean h ki jab hum kuch bhi enter krenge us textbox me toh uski value ho jayegi save form me or ishiliye sari textbox k value diffrent h

// Kyoon zaroori hai key?
// Ye React ko help karta hai DOM updates optimize karne me.

// Bina key ke React har baar puri list render karega, jo inefficient hai.


// React me jab aap kisi list (jaise ki .map()) se multiple elements render karte ho, to har element ko ek unique key deni hoti hai taaki React efficiently samajh sake ki kaunsa item add/update/delete hua hai.