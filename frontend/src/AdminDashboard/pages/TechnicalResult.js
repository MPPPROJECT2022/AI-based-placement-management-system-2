import React from 'react'
import Table from '../components/table/Table'

const TechnicalTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total exams',
    'total percentage',
    'location'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

function TechnicalResult() {
    return (
        <>
            <div>
                <h2 className="page-header">
                    customers
                </h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                {/* <Table
                                    limit='10'
                                    headData={TechnicalTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={customerList}
                                    renderBody={(item, index) => renderBody(item, index)}
                                /> */}
                                some content here
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TechnicalResult