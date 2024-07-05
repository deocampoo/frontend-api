import React from 'react';

function Footer() {
    return (
        <div className="container-fluid pb-0 mb-0 justify-content-center text-light">
            <footer className="fixed-bottom" style={{ backgroundColor: "#1E242A", color: "#caced1", padding: "4px", textAlign: "center", fontSize: "12px" }}>
                <div className="row justify-content-center mt-0 pt-0 row-1 mb-0 px-sm-3 px-2">
                    <div className="col-12">
                        <div className="row my-2 row-1 no-gutters">
                            <div className="col-sm-3 col-auto text-center"><small>&#9400; Movie HUB || Todos los derechos reservados</small></div>
                            <div className="col-md-3 col-auto"></div>
                            <div className="col-md-3 col-auto"></div>
                            <div className="col my-auto text-md-left text-right"><small> info@moviehub.com.ar <span><img src="https://i.imgur.com/TtB6MDc.png" className="img-fluid" width="20"/></span> <span><img src="https://i.imgur.com/N90KDYM.png" className="img-fluid" width="20"/></span></small></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
