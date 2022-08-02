import classes from "./SideSearch.module.css";

export default function SideSearch() {
  return (
    <aside className={`card col-lg-3 mb-2 ${classes.card}`}>
      <div className={`card-body`}>
        <div className="d-flex justify-content-between">
          <h5 className={`card-title ${classes.cardTitle}`}>Filter</h5>
          <a href="s" className="text-decoration-none">
            Clear
          </a>
        </div>
        <input
          className={`form-control my-2 ${classes.input}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <hr />
        <div>
          <h5 className={`card-title ${classes.cardTitle}`}>Location</h5>
          <input
            className={`form-control my-2 ${classes.input}`}
            type="search"
            placeholder="country"
            aria-label="Search"
          />
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Egypt
            </label>
          </div>
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              USA
            </label>
          </div>
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Germany
            </label>
          </div>
        </div>
        <hr />
        <div>
          <h5 className={`card-title ${classes.cardTitle}`}>Skills</h5>
          <input
            className={`form-control my-2 ${classes.input}`}
            type="search"
            placeholder="skill"
            aria-label="Search"
          />
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              HTML
            </label>
          </div>
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              CSS
            </label>
          </div>
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Javascript
            </label>
          </div>
        </div>
        <hr />
        <div>
          <h5 className={`card-title ${classes.cardTitle}`}>Type</h5>
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Internship
            </label>
          </div>
          <div className={`form-check ${classes.formCheck}`}>
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Payed
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
