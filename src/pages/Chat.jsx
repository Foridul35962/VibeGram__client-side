import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages, messageOptimisticAdd, messageOptimisticFail, replaceOptimisticMessage, sendMessage } from '../stores/slice/messageSlice';
import { toast } from 'react-toastify';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Send, Image as ImageIcon, X, ChevronLeft, Loader2 } from 'lucide-react';
import avatar from '../assets/avatar.png';
import { nanoid } from '@reduxjs/toolkit';
import socket from '../socket';

const Chat = () => {
    const { messages, messageLoading, partnerData } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.user);
    const { onlineUsers } = useSelector((state) => state.message)
    const dispatch = useDispatch();
    const { partnerId } = useParams();
    const [text, setText] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [file, setFile] = useState(null);
    const scrollRef = useRef(null);
    const navigate = useNavigate()
    const isOnline = onlineUsers[partnerId]

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setFile(file);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !file) return;

        const tempId = `temp-${nanoid()}`;
        const optimisticMsg = {
            _id: tempId,
            sender: user?._id,
            receiver: partnerId,
            text: text.trim(),
            image: previewImage
                ? { url: previewImage, publicId: null }
                : null,
            createdAt: new Date().toISOString()
        };

        dispatch(messageOptimisticAdd(optimisticMsg));

        const formData = new FormData();
        formData.append('text', text.trim());
        if (file) formData.append('file', file);
        setText("");

        try {
            await dispatch(sendMessage({ data: formData, receiver: partnerId })).unwrap();
            setFile(null);
            setPreviewImage(null);
        } catch (error) {
            dispatch(messageOptimisticFail({ tempId, error: err?.message || "Failed" }));
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const handleNewMessage = (message) => {
            if (message.sender !== partnerId && message.receiver !== partnerId) {
                return
            }
            dispatch(replaceOptimisticMessage(message))
        }
        socket.on('message:new', handleNewMessage)

        return () => {
            socket.off('message:new', handleNewMessage)
        }
    }, [dispatch, partnerId])

    useEffect(() => {
        dispatch(getAllMessages(partnerId));
    }, [dispatch, partnerId]);

    return (
        <div className="flex flex-col h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans">

            {/* --- Header --- */}
            <header className="px-6 py-4 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/50 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link to={-1} className="hover:bg-zinc-800 p-2 rounded-xl transition-all active:scale-90">
                        <ChevronLeft size={22} className="text-zinc-400" />
                    </Link>

                    <div className="flex items-center gap-3.5">
                        <div className="relative group cursor-pointer">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                            <img
                                src={partnerData?.image?.url || avatar}
                                className="relative size-11 rounded-full object-cover border-2 border-zinc-900"
                                alt="partner"
                                onClick={() => navigate(`/profile/${partnerData?.userName}`)}
                            />
                            <div className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 border-[3px] border-[#09090b] rounded-full"></div>
                        </div>
                        <div>
                            <h2 onClick={() => navigate(`/profile/${partnerData?.userName}`)} className="text-[15px] font-semibold cursor-pointer tracking-wide">{partnerData?.userName}</h2>
                            <div className="flex items-center gap-1.5">
                                <span className={`size-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'
                                    }`}
                                />
                                <span className="text-[11px]">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Chat Scroll Area --- */}
            <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 scrollbar-hide flex flex-col">
                {messageLoading && messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                        <Loader2 className="animate-spin text-indigo-500" size={32} />
                        <p className="text-zinc-500 text-sm font-medium">Loading conversations...</p>
                    </div>
                ) : (
                    <div className="max-w-4xl w-full mx-auto space-y-0">
                        {messages.length > 0 && messages?.map((msg, index) => {
                            const isPartner = msg.sender !== user?._id;
                            return (
                                <div key={index} className={`flex ${isPartner ? 'justify-start' : 'justify-end'} group mb-1`}>
                                    <div className={`flex flex-col max-w-[85%] md:max-w-[65%] ${isPartner ? 'items-start' : 'items-end'}`}>

                                        <div className={`relative shadow-2xl transition-all duration-300 ${isPartner
                                            ? 'bg-zinc-900 text-zinc-200 rounded-2xl rounded-tl-none border border-zinc-800/50'
                                            : 'bg-indigo-600 text-white rounded-2xl rounded-tr-none shadow-indigo-500/10'
                                            } ${msg.image ? 'p-1.5' : 'px-4 py-3'}`}>

                                            {msg.image && msg.image.url && (
                                                <div className={`${msg.text ? 'mb-2' : ''} overflow-hidden rounded-xl`}>
                                                    <img
                                                        src={msg.image.url}
                                                        alt="Shared content"
                                                        className="w-full max-h-72 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer rounded-xl"
                                                    />
                                                </div>
                                            )}

                                            {msg.text && (
                                                <p className={`text-[14.5px] leading-relaxed select-text ${msg.image ? 'px-2 pb-1.5' : ''}`}>
                                                    {msg.text}
                                                </p>
                                            )}
                                        </div>

                                        <span className="text-[10px] text-zinc-600 font-semibold px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={scrollRef} />
                    </div>
                )}
            </main>

            {/* --- Dynamic Footer & Input --- */}
            <footer className="p-4 md:p-6 bg-[#09090b] border-t border-zinc-900/50">
                <div className="max-w-4xl mx-auto">
                    {/* Floating Image Preview */}
                    {previewImage && (
                        <div className="mb-4 relative inline-block animate-in slide-in-from-bottom-4 duration-300">
                            <button
                                onClick={() => { setPreviewImage(null); setFile(null); }}
                                className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1.5 shadow-lg hover:bg-rose-500 transition-all z-10 active:scale-90"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                            <div className="p-1 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl">
                                <img src={previewImage} alt="Preview" className="h-28 w-28 object-cover rounded-xl" />
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-md rounded-[20px] p-2 pl-4 border border-zinc-800 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all">
                        <label className="cursor-pointer text-zinc-400 hover:text-indigo-400 transition-colors p-2 hover:bg-zinc-800 rounded-full">
                            <ImageIcon size={22} />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>

                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent py-2.5 text-[14.5px] focus:outline-none placeholder:text-zinc-600"
                        />

                        <button
                            type="submit"
                            disabled={!text.trim() && !file}
                            className={`p-3 cursor-pointer rounded-[14px] transition-all duration-300 flex items-center justify-center ${text.trim() || file
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-100 hover:bg-indigo-500'
                                : 'bg-zinc-800 text-zinc-600 opacity-50 scale-95 pointer-events-none'
                                }`}
                        >
                            <Send size={18} className={text.trim() || file ? 'fill-current' : ''} />
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
};

export default Chat;