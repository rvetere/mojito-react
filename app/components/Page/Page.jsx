import React from 'react';

class Page extends React.Component {
    render() {
        const {children, ...props} = this.props;
        return (
            <div className="page">
                this is a page
                {children}
            </div>
            );
    }
}

export default Page
