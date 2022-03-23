
import BarraPrincipalAdministrador from "./administrador/BarraPrincipalAdministrador";
import BarraPrincipal from "./cliente/BarraPrincipal";
import BarraPrincipalTerapeuta from "./terapeuta/BarraPrincipalTerapeuta";

const tipousuario = localStorage.getItem('tipo')

export default function Principal()
{

    return (
        <div className="bgcolor-general">
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5 "></div>
                {tipousuario==='cliente'
                ?<BarraPrincipal/>
                :<>
                {tipousuario==='terapeuta'
                    ?<BarraPrincipalTerapeuta/>
                    :<BarraPrincipalAdministrador/>
                    }
                </>
                }
                <div className="container px-4 px-lg-5 h-100 border bgcolor-content ">
                 <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div> 
                <header className="masthead">
                    <div className="container px-4 px-lg-5 h-100">
                        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                            <div className="col-lg-8 align-self-end">
                                <h1 >Your Favorite Place for Free Bootstrap Themes</h1>
                                <hr className="divider" />
                            </div>
                            <div className="col-lg-8 align-self-baseline">
                                <p className="text-white-75 mb-5">Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!</p>
                                <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </header>
                <section className="page-section bg-primary" id="about">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="text-white mt-0">We've got what you need!</h2>
                                <hr className="divider divider-light" />
                                <p className="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                                <a className="btn btn-light btn-xl" href="#services">Get Started!</a> 
                            </div>
                        </div>
                        <br></br>
                    </div>
                </section>
                <br></br>
                <section className="page-section" id="services">
                    <div className="container px-4 px-lg-5">
                        <h2 className="text-center mt-0">At Your Service</h2>
                        <hr className="divider" />
                        <div className="row gx-4 gx-lg-5">
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i class="bi-gem fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Sturdy Themes</h3>
                                    <p className="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Up to Date</h3>
                                    <p className="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Ready to Publish</h3>
                                    <p className="text-muted mb-0">You can use this design as is, or you can make changes!</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="mt-5">
                                    <div className="mb-2"><i class="bi-heart fs-1 text-primary"></i></div>
                                    <h3 className="h4 mb-2">Made with Love</h3>
                                    <p className="text-muted mb-0">Is it really open source if it's not made with love?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <div id="portfolio">
                    <div className="container-fluid p-0">
                    </div>
                </div>

                <br></br>
                <section className="page-section bg-dark text-white">
                    <div className="container px-4 px-lg-5 text-center">
                    </div>
                </section>
                <br></br>
                <section className="page-section" id="contact">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6 text-center">
                                <h2 className="mt-0">Let's Get In Touch!</h2>
                                <hr className="divider" />
                                <p className="text-muted mb-5">Ready to start your next project with us? Send us a messages and we will get back to you as soon as possible!</p>
                            </div>
                        </div>

                        <br></br>
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-lg-4 text-center mb-5 mb-lg-0">
                                <i className="bi-phone fs-2 mb-3 text-muted"></i>
                                <div>+1 (555) 123-4567</div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
        </div>
    );
}