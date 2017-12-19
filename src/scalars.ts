import { GraphQLScalarType, ValueNode, Kind } from 'graphql'

const DateTime: GraphQLScalarType = {
  name: 'DateTime',
  description: 'An ISO-8601 encoded UTC date string.',

  serialize(value: any): any {
    return value
  },

  parseValue(value: any): any {
    return value
  },

  parseLiteral(valueNode: ValueNode): any {
    return parseLiteral(valueNode)
  },
}

const Json: GraphQLScalarType = {
  name: 'Json',
  description: 'Raw JSON value.',

  serialize(value: any): any {
    return value
  },

  parseValue(value: any): any {
    return value
  },

  parseLiteral(valueNode: ValueNode): any {
    return parseLiteral(valueNode)
  },
}

export const scalars = { DateTime, Json }

function parseLiteral(ast: ValueNode): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN: {
      return ast.value
    }
    case Kind.INT:
    case Kind.FLOAT: {
      return parseFloat(ast.value)
    }
    case Kind.OBJECT: {
      const value = Object.create(null)
      ast.fields.forEach(field => {
        value[field.name.value] = parseLiteral(field.value)
      })

      return value
    }
    case Kind.LIST: {
      return ast.values.map(parseLiteral)
    }
    default:
      return null
  }
}