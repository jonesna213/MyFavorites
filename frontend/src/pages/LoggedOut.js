import { useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../store/Context";

const LoggedOut = () => {
    const ctx = useContext(Context);
    let { reason } = useParams();
    if (ctx.user !==  null) {
        ctx.setUser(null);
    }

    return (
        <section className="my-5 py-5 text-center">
            <h4 className="mb-5">You have been logged out</h4>
            <p>The reason for your logout is:</p>
            <p className="text-danger">{reason}</p>
            <a className="btn btn-success my-5" href="/signIn">Sign back in</a>
        </section>
    );
}

export default LoggedOut;