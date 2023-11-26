import React, { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>
            <footer className="py-3 bg-dark text-white">
                <div className="container text-center">
                    <p className="mb-0">
                        &copy; 2023 KangKong Chips. All Rights Reserved.
                    </p>
                    <p className="mb-0">
                        <a href="/privacy-policy" className="text-white">
                            Privacy Policy
                        </a>
                        {' | '}
                        <a href="/terms-of-service" className="text-white">
                            Terms of Service
                        </a>
                    </p>
                    {/* Add additional links or information as needed */}
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;