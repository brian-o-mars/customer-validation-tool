import React, { useState } from "react";
import "./cardResolve.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

function CardResolve() {
  const [cardBin, setCardBin] = useState("");

  const [cardInfo, setCardInfo] = useState("");

  const handleCardBinChange = (e) => {
    setCardBin(e.target.value);
  };

  const getCardBin = (e) => {
    e.preventDefault();
    fetch(`https://api.paystack.co/decision/bin/${cardBin}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer sk_test_80f86ba56678ddaab65415ffa8327fe728b9a4c0",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.bank);
        setCardInfo(data.data.bank);
      });
  };
  return (
      <div>
          <h1>Card resolve app</h1>
      <h5>
        Zero error handling for now. If you don't get a result in 10 sec, please
        check your inputs
      </h5>
    <div className="main">
      <div className="inputs">
        <form action="">
          <div className="cardBin">
            <input onChange={handleCardBinChange} />
          </div>
          <div className="button">
            <button onClick={getCardBin}>Resolve</button>
          </div>
        </form>
      </div>
      <div className="display">
        <div>
          <h2>Here's your result</h2>
        </div>
        <div className="result">{cardInfo}</div>

        {/* implementing copy button */}
        <CopyToClipboard className="copyButton" text={cardInfo}>
          <FontAwesomeIcon icon={faCopy} />
        </CopyToClipboard>
      </div>
    </div>
    </div>
  );
}

export default CardResolve;
