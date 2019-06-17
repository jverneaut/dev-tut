import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import logo from '../images/logo.svg';

import { getUnlockedLevel } from '../store';

const SideBar = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allExercise(sort: { order: ASC, fields: [order] }) {
            nodes {
              slug
              name
              order
            }
          }
        }`
      }
      render={data => {
        const unlockedLevel = getUnlockedLevel();
        const exercises = data.allExercise.nodes;
        return (
          <div className="sidebar">
            {exercises.map((exercise, index) => {
              if (index === unlockedLevel) {
                return (
                  <Link className="sidebar__link" to={'/' + exercise.slug} key={exercise.slug}>
                    <div className="badge badge--current"></div>
                    {index} — {exercise.name}
                  </Link>
                )
              } else if (index < unlockedLevel) {
                return (
                  <Link className="sidebar__link" to={'/' + exercise.slug} key={exercise.slug}>
                    <div className="badge badge--success"></div>
                    {index} — {exercise.name}
                  </Link>
                )
              } else {
                return (
                  <div className="sidebar__link sidebar__link--disabled" key={exercise.slug}>
                    <div className="badge"></div>
                    {index} — {exercise.name}
                  </div>
                )
              }
            })}
            <img src={logo} alt="AW" class="sidebar__logo" />
          </div>
        )
      }}
    />
  )
}

export default SideBar;
