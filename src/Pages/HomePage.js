import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../app/routes';

export default function HomePage() {
  return (
    <section className='center'>
        <div className="home-page-text">
            <h2>Create a topic to get started</h2>
            <Link to={ROUTES.newTopicRoute()} className='button'>
            Get started!
            </Link>
          </div>
    </section>
  )
}
