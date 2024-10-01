import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import "./CollegeTable.css";
import dummyData from "./dummyData";

const CollegeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("rating");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredColleges = dummyData.filter((college) =>
    college.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortColleges = () => {
    const sortedColleges = [...filteredColleges];
    sortedColleges.sort((a, b) => {
      let comparison = 0;

      if (sortCriteria === "rating") {
        comparison = a.userReviews - b.userReviews;
      } else if (sortCriteria === "fees") {
        comparison = a.fees - b.fees;
      } else if (sortCriteria === "placement") {
        comparison = a.placementAverage - b.placementAverage;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sortedColleges;
  };

  const sortedColleges = sortColleges();

  const handleSortChange = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  return (
    <div className="table-container">
      <div className="search-container" style={{ textAlign: "right" }}>
        <Form.Control
          type="text"
          placeholder="Search by college name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "250px", display: "inline-block" }}
        />
      </div>

      <div className="sorting-container">
        <Button variant="light" onClick={() => handleSortChange("rating")}>
          Sort by Rating{" "}
          {sortCriteria === "rating" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </Button>
        <Button variant="light" onClick={() => handleSortChange("fees")}>
          Sort by Fees{" "}
          {sortCriteria === "fees" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </Button>
        <Button variant="light" onClick={() => handleSortChange("placement")}>
          Sort by Placement{" "}
          {sortCriteria === "placement"
            ? sortOrder === "asc"
              ? "↑"
              : "↓"
            : ""}
        </Button>
      </div>

      <Table bordered responsive="sm" className="college-table">
        <thead>
          <tr>
            <th>CD Rank</th>
            <th>Colleges</th>
            <th>Course Fees</th>
            <th>Placement</th>
            <th>User Reviews</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {sortedColleges.length > 0 ? (
            sortedColleges.map((college, index) => (
              <tr key={index}>
                <td className="cd-rank">{index + 1}</td>
                <td className="college-info">
                  <div className="college-header">
                    <img
                      src={college.logo}
                      alt={college.college}
                      className="college-logo"
                    />
                    <div>
                      <a href="#" className="college-name">
                        {college.college}
                      </a>
                      <div>{college.location}</div>
                      <div>{college.ownership} | AICTE Approved</div>
                      <div className="courses">
                        {college.coursesOffered.join(", ")}
                      </div>
                      {college.featured && (
                        <div className="featured">Featured</div>
                      )}
                    </div>
                  </div>
                  <div className="college-actions">
                    <Button variant="danger">Apply Now</Button>
                    <a href="#" className="brochure-link">
                      Download Brochure
                    </a>
                  </div>
                </td>
                <td className="fees-info">
                  ₹ {college.fees.toLocaleString()}
                  <br />
                  1st Year Fees
                  <br />
                  <a href="#" className="compare-link">
                    Compare Fees
                  </a>
                </td>
                <td className="placement-info">
                  ₹ {college.placementAverage.toLocaleString()}
                  <br />
                  Average Package
                  <br />₹ {college.placementHighest.toLocaleString()} Highest
                  Package
                  <br />
                  <a href="#" className="compare-link">
                    Compare Placement
                  </a>
                </td>
                <td className="reviews-info">
                  <span className="review-score">{college.userReviews}/10</span>
                  <br />
                  Based on {college.userReviewCount} Reviews
                </td>
                <td className="ranking-info">
                  #{college.rankIndia} in India
                  <br />
                  Rank 2023
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No colleges found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CollegeTable;
