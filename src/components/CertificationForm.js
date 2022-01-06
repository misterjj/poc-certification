import {useRef, useState} from "react";
import {Overlay, Tooltip} from "react-bootstrap";

export default function CertificationForm() {
    const [phoneIsValidate, setPhoneIsValidate] = useState(false)
    const [phoneFormatIsValid, setPhoneFormatIsValid] = useState(false)
    const [phoneCodeSent, setPhoneCodeSent] = useState(false)
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const phoneFormatValidation = (value) => {
        setPhoneFormatIsValid(value !== "")
    }

    const phoneSend = () => {
        setPhoneCodeSent(true)
    }

    const validCode = () => {
        setPhoneIsValidate(true)
    }

    return <form className="bg-white p-4 rounded-3 border border-2">
        <div className="h2 text-center mb-3">Certification</div>

        <div className="mb-3">
            <input type="text" id="name" className="form-control" placeholder="Nom"/>
        </div>

        <div className="mb-3">
            <input type="text" id="lastname" className="form-control" placeholder="Prénom"/>
        </div>

        <div className="row mb-3">
            <div className={(phoneFormatIsValid && !phoneIsValidate ? "col-8" : "col-12")}>
                <input type="text" id="phone"
                       className={"form-control " + (phoneIsValidate ? " is-valid" : "")}
                       placeholder="Téléphone"
                       readOnly={phoneIsValidate}
                       onChange={event => phoneFormatValidation(event.target.value)}/>
            </div>
            {phoneFormatIsValid && !phoneIsValidate &&
            <button className={"col-4 btn " + (phoneCodeSent ? "btn-outline-secondary" : "btn-secondary")}
                    onClick={event => {
                        event.preventDefault();
                        phoneSend()
                    }}>
                {phoneCodeSent ? "Renvoyer le code" : "Envoyer le code"}
            </button>
            }
        </div>

        {phoneCodeSent && !phoneIsValidate &&
        <div className="row mb-3">
            <div className="col-8">
                <input type="text" id="code" className="form-control" placeholder="Code SMS"/>
            </div>

            <button className="col-4 btn btn-success"
                    onClick={event => {
                        event.preventDefault();
                        validCode()
                    }}>
                Validé de Code
            </button>
        </div>
        }

        <div className="d-grid">
            <button className="btn btn-lg btn-block btn-outline-primary position-relative"
                    onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                {!phoneIsValidate &&
                [
                    <i className="bi bi-exclamation-diamond-fill fs-3 text-warning position-absolute top-0 start-100 translate-middle"/>,
                    <i className="bi bi-exclamation-diamond text-black fs-3 position-absolute top-0 start-100 translate-middle"
                       ref={target}/>,

                    <Overlay target={target.current} show={show} placement="right">
                        <Tooltip id="overlay-example" className="tooltip-warning">
                            Numéro de téléphone non validé
                        </Tooltip>
                    </Overlay>
                ]
                }
                Envoyer
            </button>
        </div>
    </form>
}