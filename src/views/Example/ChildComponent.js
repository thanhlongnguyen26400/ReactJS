import React from 'react';

class ChildComponent extends React.Component {


    state = {
        showJobs: false
    }
    handleShowHide = () => {
        this.setState({
            showJobs: !this.state.showJobs
        })
    }
    handleOnclickDelete = (job) => {
        console.log("handleOnclickDelete : ", job);
        this.props.deleteJob(job);
    }

    //re-render
    render() {
        let { arrJobs } = this.props;
        let { showJobs } = this.state;
        console.log('>>> check conditional: ', showJobs)
        return (
            <>
                {showJobs === false ?
                    <div>
                        <button onClick={() => this.handleShowHide()}>Show</button>
                    </div>
                    :
                    <>
                        <div className="job-lists">
                            {
                                arrJobs.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            {item.title} - {item.salary}
                                            <></> <span onClick={() => this.handleOnclickDelete(item)}> X </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button onClick={() => this.handleShowHide()}>Hide</button>
                        </div>
                    </>

                }
            </>
        )

    }
}

export default ChildComponent;