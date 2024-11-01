import { useUI } from "$store/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  loginHref: string;
}

export default function LoginButton({ loginHref }: Props) {
  const { userLogged, userEmail } = useUI();

  return (
    <a
      class="flex items-center gap-2"
      href={userLogged.value ? "/account" : loginHref}
      aria-label="Entre ou Cadastre-se"
    >
      <div class="text-primary p-1 rounded-full">
        <Icon id="User" strokeWidth={1} class="w-[24px] h-[24px]" />
      </div>
      <p class="text-base text-primary-content">
        {!userLogged.value
          ? (
            <>
              Entre ou cadastre-se
            </>
          )
          : (
            <>
              {userEmail.value}
            </>
          )}
      </p>
    </a>
  );
}
