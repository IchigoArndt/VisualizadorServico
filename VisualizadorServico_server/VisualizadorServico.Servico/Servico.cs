using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisualizadorServico.Dominio.IniciarServico;

namespace VisualizadorServico.Servico
{
    public static class Servico
    {

        public static List<String> ListarServico()
        {
            ListarServico ls = new ListarServico();

            return ls.Listar();
        }
        public static void PararServico()
        {

        }

        public static void IniciarServico()
        {

        }

        public static void AbrirService()
        {

        }

    }
}
