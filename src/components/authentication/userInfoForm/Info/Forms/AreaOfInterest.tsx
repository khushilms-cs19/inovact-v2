import React, {useState, useEffect} from 'react'
import datascience from 'images/user-info/aoi/datascience.svg'
import project from 'images/user-info/aoi/projectmanagement.svg'
import webdev from 'images/user-info/aoi/webdev.svg'
import cloud from 'images/user-info/aoi/cloud.svg'
import ml from 'images/user-info/aoi/ml.svg'
import robotics from 'images/user-info/aoi/robotics.svg'
import coding from 'images/user-info/aoi/coding.svg'
import business from 'images/user-info/aoi/businessanalysis.svg'
import gaming from 'images/user-info/aoi/gaming.svg'
import electrical from 'images/user-info/aoi/electrical.svg'
import uiux from 'images/user-info/aoi/uiux.svg'
import fintech from 'images/user-info/aoi/fintech.svg'
import economics from 'images/user-info/aoi/economics.svg'
import mechanical from 'images/user-info/aoi/mechanical.svg'
import hr from 'images/user-info/aoi/HR.svg'
import marketing from 'images/user-info/aoi/marketing.svg'
import stock from 'images/user-info/aoi/stock.svg'
import { useSelector } from 'react-redux'


const areas = [
    {
        name: 'Data Science',
        image: datascience,
    },
    {
        name: 'Project Management',
        image: project,
    },
    {
        name: 'Web dev',
        image: webdev,
    },
    {
        name: 'Cloud Computing',
        image: cloud,
    },
    {
        name: 'ML and AI',
        image: ml,
    },
    {
        name: 'Robotics',
        image: robotics,
    },
    {
        name: 'Competetive coding',
        image: coding,
    },
    {
        name: 'Business Analytic',
        image: business,
    },
    {
        name: 'Gaming',
        image: gaming,
    },
    {
        name: 'Electrical',
        image: electrical,
    },
    {
        name: 'UI/UX',
        image: uiux,
    },
    {
        name: 'FinTech',
        image: fintech,
    },
    {
        name: 'Economics',
        image: economics,
    },

    {
        name: 'Mechanical',
        image: mechanical,
    },
    {
        name: 'Human Resources',
        image: hr,
    },
    {
        name: 'Marketing',
        image: marketing,
    },
    {
        name: 'Stock Trading',
        image: stock,
    },
];

function AreaOfInterest(props :any) {
    const {
      formField: {
         aoi   
      }
    } = props;
    const [userAOI, setUserAOI] = useState<string[]>([]);
    const userInfo = useSelector((state: any)=> state.userInfo);
    const addAOI = (name: any)=>{
        const aoi = userInfo.area_of_interests.slice(0);
        // aoi.includes(name) ? aoi.filter((ele)=>ele!==name) : aoi.push(name);
        aoi.includes(name) ? aoi.splice(aoi.indexOf(name),1) : aoi.push(name);
        setUserAOI([...aoi]);
        // console.log(userAOI);
        props.handleChange('area-of-interest', aoi);
    }
    return (
                <section className="area-of-interest">
                    <div className="area-of-interest__text">
                        <h6 className="heading-secondary size-small">
                            Tell Us What You Are Interested In
                        </h6>
                        <p className="paragraph-primary--green">
                            Make sure you select atleast three topics
                        </p>
                    </div>
                    <div className="area-of-interest__form">
                        <form>
                            <ul className="area-of-interest__form__list">
                                {areas.map((item:any, index:number) => {
                                    return (
                                        <li key={index}>
                                            <div className="area-of-interest__form__list__item">
                                                <input
                                                    type="checkbox"
                                                    id={`aoi-${index}`}
                                                    name={aoi.name}
                                                    value={item.name}
                                                    onClick={addAOI.bind(null, item.name)} 
                                                    hidden
                                                />
                                                <label
                                                    className="checkbox-label"
                                                    htmlFor={`aoi-${index}`}
                                                    
                                                >
                                                    <img src={item.image} alt="" />
                                                    {item.name}
                                                </label>
                                            </div>
                                        </li>
                                    )
                                })}
                                   <li >
                                          
                                        </li>
                            </ul>
                        </form>
                    </div>
                </section>
    )
}

export default AreaOfInterest;