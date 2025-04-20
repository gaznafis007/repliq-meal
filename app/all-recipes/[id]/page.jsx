'use client'
import { useParams } from 'next/navigation';
import React from 'react';

const RecipeDetails = () => {
    const {id} = useParams()
    return (
        <div className='min-h-screen py-10'>
            <h2 className="text-4xl text-amber-500 text-center">This is details {id}</h2>
        </div>
    );
};

export default RecipeDetails;