import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import clsx from "clsx";
import { Cross1Icon } from "@radix-ui/react-icons";
export type ModalProps = {
  open: boolean;
  closeModal?: () => void | null;
  children: ReactNode;
  className?: string;
  showModalCloseBtn?: boolean;
  dataTestId?: string;
};

const Modal: FC<ModalProps> = ({
  open,
  closeModal,
  children,
  className = "max-w-xl",
  showModalCloseBtn = false,
  dataTestId = "",
}) => {
  const panelStyle = clsx(
    {
      "w-full transform bg-white text-left align-middle rounded-9xl shadow modalContent":
        true,
    },
    {
      [className]: true,
    }
  );
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="z-50 flex items-center justify-center fixed left-0 right-0 top-0 bottom-0 backdrop-blur-sm bg-black/60"
          onClick={closeModal}
        >
          <div
            className="flex justify-center min-w-full"
            data-testid={dataTestId}
          >
            {showModalCloseBtn && (
              <div
                className={`${panelStyle} fixed bg-transparent overflow-visible`}
              >
                <Cross1Icon />
              </div>
            )}
            <div className={panelStyle} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Modal;
