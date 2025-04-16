"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import menuData from "./menuData";
import { Cliente } from "@/types/cliente";

const Header = () => {

  const router = useRouter();
  const pathUrl = usePathname();

  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  // Sticky menu
  const handleStickyMenu = useCallback(() => {
    setStickyMenu(window.scrollY >= 80);
  }, []);

  const doLogout = () => {
    localStorage.removeItem("cliente");
    localStorage.removeItem('auth-token');
    setCliente(null);
    router.push('/');
  }

  useEffect(() => {

    // Load client data
    const storedCliente = localStorage.getItem("cliente");
    if (storedCliente) {
      try {
        const parsedCliente = JSON.parse(storedCliente);
        setCliente(parsedCliente);
      } catch (error) {
        console.error('Error parsing client data:', error);
      }
    }

    window.addEventListener("scroll", handleStickyMenu);
    console.log(pathUrl);

  }, [pathUrl]);

  return (
    <header
      className={`fixed left-0 top-0 z-999 w-full  py-7 
        ${stickyMenu ? "bg-white transition duration-100 dark:bg-black" : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4">

          <a href={cliente ? '/portaldocliente' : '/'}>
            <Image
              src={ !stickyMenu && pathUrl === '/' ? "/images/logo/logo.png" 
                : stickyMenu && pathUrl === '/' ? "/images/logo/logo2.png" 
                : "/images/logo/logo2.png" 
              }
              alt="logo"
              width={200}
              height={0}
              className="dark:hidden"
            />
          </a>

          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm ${!stickyMenu && pathUrl === '/' ? "bg-white" 
                    : stickyMenu && pathUrl === '/' ? "bg-black" : "bg-black" } 
                    delay-[0] duration-300 ease-in-out dark:bg-white ${!navigationOpen ? "!w-full delay-300" : "w-0"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm ${!stickyMenu && pathUrl === '/' ? "bg-white" 
                    : stickyMenu && pathUrl === '/' ? "bg-black" : "bg-black" } 
                    delay-150 duration-300 ease-in-out dark:bg-white ${!navigationOpen ? "delay-400 !w-full" : "w-0"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm ${!stickyMenu && pathUrl === '/' ? "bg-white" 
                    : stickyMenu && pathUrl === '/' ? "bg-black" : "bg-black" } 
                    delay-200 duration-300 ease-in-out dark:bg-white ${!navigationOpen ? "!w-full delay-500" : "w-0"
                    }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm ${!stickyMenu && pathUrl === '/' ? "bg-white" 
                    : stickyMenu && pathUrl === '/' ? "bg-black" : "bg-black" } 
                    delay-300 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "!h-0 delay-[0]" : "h-full"
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm ${!stickyMenu && pathUrl === '/' ? "bg-white" 
                    : stickyMenu && pathUrl === '/' ? "bg-black" : "bg-black" } 
                    duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "!h-0 delay-200" : "h-0.5"
                    }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${navigationOpen &&
            "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
            }`}
        >
          {cliente?.nome == "" || cliente?.nome == undefined ?
            <nav>
              <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
                {menuData.map((menuItem, key) => (
                  <li key={key} className={menuItem.submenu && "group relative"}>
                    {menuItem.submenu ? (
                      <>
                        <button
                          onClick={() => setDropdownToggler(!dropdownToggler)}
                          className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                        >
                          {menuItem.title}
                          <span>
                            <svg
                              className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </span>
                        </button>

                        <ul
                          className={`dropdown ${dropdownToggler ? "flex" : ""}`}
                        >
                          {menuItem.submenu.map((item, key) => (
                            <li key={key} className="hover:text-primary">
                              <Link href={item.path || "#"}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (

                      navigationOpen ? 
                        <Link 
                          href={`${menuItem.path}`}
                          className={`text-lg text-gray-500 hover:text-black`}
                        >
                          {menuItem.title}
                        </Link>
                        :
                        <Link
                          href={`${menuItem.path}`}
                          className={`text-lg                          
                            ${ !stickyMenu && pathUrl === '/' ? "text-white hover:text-gray-300 hover:text-xl" : "" }
                            ${  stickyMenu && pathUrl === '/' ? "text-text-gray-400 hover:text-blck hover:text-xl" : "" }
                            ${  pathUrl !== '/' || navigationOpen ? "text-primary hover:text-primaryho hover:text-xl" : "" }
                          `}
                        >
                          {menuItem.title}
                        </Link>
                      
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            : <></>}

          {cliente?.nome == "" || cliente?.nome == undefined ?
            <div className="mt-7 flex items-center gap-6 xl:mt-0">

              { /*  Desabilitado
              <Link href={"/autenticacao/login"}>Login</Link>
              <Link href={"/autenticacao/cadastro"}>Cadastro</Link>
              */ }

              <Link
                href="/simulacao"
                className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
              >
                Simular Renderização
              </Link>
            </div>
            :
            <>
              <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
                <li></li>
              </ul>
              <div className="mt-7 flex items-center gap-6 xl:mt-0">

                <Link href={"/"} onClick={doLogout}>Logout</Link>

                <Link
                  href="/simulacao"
                  className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
                >
                  Nova Renderização
                </Link>
              </div>
            </>
          }
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;