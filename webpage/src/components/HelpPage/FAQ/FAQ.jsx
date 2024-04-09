import React from 'react';
import "./FAQ.css";
import sections from '../../../constants/strings';
import Question from './Question';

const FAQ = () => {
    return (
        <section className='faq section-p bg-md-black' id="faq">
            <div className='container'>
                <div className='section-head text-center'>
                    <h1 className='faq-title'>FAQ</h1>
                </div>
                <div className='item-list text-white'>
                    {
                        sections.features.map(faq => {
                            return (
                                <Question key={faq.id} {...faq} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default FAQ
