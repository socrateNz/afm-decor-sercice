'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from "framer-motion"

interface Video {
    id: string
    url: string
    title: string
}

interface Props {
    realisation: Video[]
}

const Realisation = ({ realisation }: Props) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Extrait l'ID d'une URL YouTube
    const getYouTubeVideoId = (urlString: string) => {
        try {
            const url = new URL(urlString);
            const searchParams = url.searchParams;
            const id = searchParams.get("v");
            if (id) return id;

            const pathname = url.pathname;
            const segments = pathname.split('/');
            return segments[segments.length - 1];
        } catch (error) {
            return "";
        }
    };

    // Récupère le titre d’une vidéo via l’API interne
    const fetchVideoTitle = async (videoId: string) => {
        try {
            const res = await fetch(`/api/get-video-title?videoId=${videoId}`);
            const data = await res.json();
            return data.title || "Titre inconnu";
        } catch (err) {
            return "Erreur de titre";
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, duration: 0.6 }
        }
    };

    return (
        <section id="gallery" className="bg-beige-50 py-12" ref={ref}>
            <div className="container-custom">
                <motion.div
                    className="section-title text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold">Nos Réalisations</h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {realisation.map((video, index) => (
                        <motion.div
                            key={index}
                            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
                            variants={imageVariants}
                            whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                        >
                            <div className="relative h-64 sm:h-72 md:h-80">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.url)}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="mt-2 text-center font-medium text-gray-800 px-2">
                                {video.title}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Realisation;
