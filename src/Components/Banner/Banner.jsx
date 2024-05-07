
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import bannerPic from "../../assets/images/banner.jpeg"
import useIsAuthenticated from '../../Hooks/useIsAuthenticated';
import { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';

const Banner = () => {
    const {userEmail} = useIsAuthenticated()
    // const {currentUser} = useContext(authContext)
    return (
        <Container>
        <section className="flex flex-col-reverse lg:flex-row justify-between items-center gap-4">
          <div className="flex-1 space-y-4">
            <h1 className=" text-xl lg:text-4xl font-bold">Stay tidy with SCC <br /> <span className="text-[#0087EB]">Technovision</span></h1>

            <p className="text-[18px]">
              Seize command of your daily tasks. Our platform streamlines task management, ensuring effortless prioritization and goal achievement.</p>

            <button>
              <Link to={userEmail ? '/manageTask' : '/login'}>
                <button className="px-6 py-2 bg-[#0087EB] text-white font-bold rounded-md hover:bg-zinc-800 transition-colors">Lets Explore</button>
              </Link>
            </button>

          </div>

          <div className="flex-1">
            <img src={bannerPic} alt="bannerPic" />
          </div>
        </section>
      </Container>
    );
};

export default Banner;